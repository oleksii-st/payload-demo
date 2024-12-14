import type { SerializedListItemNode, SerializedListNode } from '@lexical/list';
import type { SerializedHeadingNode } from '@lexical/rich-text';
import type { LinkFields, SerializedLinkNode } from '@payloadcms/richtext-lexical';
import escapeHTML from 'escape-html';
import type { SerializedElementNode, SerializedLexicalNode, SerializedTextNode } from 'lexical';
import React, { Fragment, JSX } from 'react';

import {
  IS_BOLD,
  IS_CODE,
  IS_ITALIC,
  IS_STRIKETHROUGH,
  IS_SUBSCRIPT,
  IS_SUPERSCRIPT,
  IS_UNDERLINE,
} from './nodeFormat';

import { Media } from '@/components/Media';
import { InlineBlock, InlineBlocksType } from '@/components/RichText/InlineBlock';
import { CMSLink } from '@/components/ui/CMSLink';
import { Link, Media as MediaType } from '@/payload-types';
import { cn } from '@/utils/cn';
import { toKebabCase } from '@/utils/toKebabCase';

interface Props {
  nodes: SerializedLexicalNode[];
  inline?: boolean;
}

export function serializeLexical({ nodes, inline = false }: Props) {
  return (
    <Fragment>
      {nodes?.map((_node, index) => {
        const node = _node as SerializedTextNode;
        const format = ['left', 'right', 'center', 'justify'].includes(String(node.format))
          ? 'text-' + String(node.format)
          : undefined;

        if (_node.type === 'text') {
          let text: React.JSX.Element | string = escapeHTML(node.text);
          if (node.format & IS_BOLD) {
            text = <strong key={index}>{text}</strong>;
          }
          if (node.format & IS_ITALIC) {
            text = <em key={index}>{text}</em>;
          }
          if (node.format & IS_STRIKETHROUGH) {
            text = (
              <span key={index} style={{ textDecoration: 'line-through' }}>
                {text}
              </span>
            );
          }
          if (node.format & IS_UNDERLINE) {
            text = (
              <span key={index} style={{ textDecoration: 'underline' }}>
                {text}
              </span>
            );
          }
          if (node.format & IS_CODE) {
            text = <code key={index}>{text}</code>;
          }
          if (node.format & IS_SUBSCRIPT) {
            text = <sub key={index}>{text}</sub>;
          }
          if (node.format & IS_SUPERSCRIPT) {
            text = <sup key={index}>{text}</sup>;
          }

          return text;
        }

        const serializedChildrenFn = (node: SerializedElementNode) => {
          if (node.children == null) {
            return null;
          } else {
            if (node?.type === 'list' && (node as SerializedListNode)?.listType === 'check') {
              for (const item of node.children) {
                if ('checked' in item) {
                  if (!item?.checked) {
                    item.checked = false;
                  }
                }
              }
              return serializeLexical({ nodes: node.children, inline });
            } else {
              return serializeLexical({ nodes: node.children, inline });
            }
          }
        };

        const serializedChildren =
          'children' in _node ? serializedChildrenFn(_node as SerializedElementNode) : '';

        if (_node.type === 'link') {
          const node = _node as SerializedLinkNode;
          const fields: LinkFields = node.fields;

          return (
            <CMSLink
              key={index}
              newTab={Boolean(fields.newTab)}
              disableIndex={Boolean(fields.newTab)}
              reference={fields.doc as Link['reference']}
              type={fields.linkType === 'internal' ? 'reference' : 'custom'}
              url={fields.url}
            >
              {serializedChildren}
            </CMSLink>
          );
        }

        if (inline) {
          return <Fragment key={index}>{serializedChildren}</Fragment>;
        }

        switch (_node.type) {
          case 'linebreak': {
            if (inline) return <Fragment key={index} />;
            return <br key={index} />;
          }
          case 'paragraph': {
            return (
              <p key={index} className={format}>
                {serializedChildren}
              </p>
            );
          }
          case 'heading': {
            const node = _node as SerializedHeadingNode;

            type Heading = Extract<keyof JSX.IntrinsicElements, 'h1' | 'h2' | 'h3' | 'h4' | 'h5'>;
            const Tag = node?.tag as Heading;

            return (
              <Tag
                key={index}
                className={format}
                id={toKebabCase(
                  String((node.children[0] as unknown as { text: string }).text ?? ''),
                )}
              >
                {serializedChildren}
              </Tag>
            );
          }
          case 'label':
            return (
              <p className={format} key={index}>
                {serializedChildren}
              </p>
            );

          case 'list': {
            const node = _node as SerializedListNode;

            type List = Extract<keyof JSX.IntrinsicElements, 'ol' | 'ul'>;
            const Tag = node?.tag as List;
            return (
              <Tag className={cn(node?.listType, format)} key={index}>
                {serializedChildren}
              </Tag>
            );
          }
          case 'listitem': {
            const node = _node as SerializedListItemNode;

            return (
              <li className={format} key={index} value={node?.value}>
                {serializedChildren}
              </li>
            );
          }
          case 'quote': {
            return (
              <blockquote key={index} className={format}>
                {serializedChildren}
              </blockquote>
            );
          }

          case 'horizontalrule': {
            return <hr key={index} />;
          }

          case 'upload': {
            const source = (node as unknown as { value: MediaType }).value;

            return (
              <Media
                source={source}
                className="mx-auto"
                sizes="(min-width: 1440px) 1408px, (min-width: 768px) calc(100vw - 64px), calc(100vw - 32px)"
              />
            );
          }

          case 'inlineBlock': {
            return (
              <InlineBlock
                key={index}
                {...(node as unknown as { fields: InlineBlocksType }).fields}
              />
            );
          }

          default:
            return null;
        }
      })}
    </Fragment>
  );
}
