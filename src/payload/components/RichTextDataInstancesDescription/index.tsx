'use client';

import './styles.css';

const RichTextDataInstancesDescription = () => {
  const clickHandler = () => {
    window.open('/admin/collections/richTextDataInstances', '_blank');
  };

  return (
    <div className="rich-text-data-instance-description">
      To change or create data instance <u onClick={clickHandler}>click here</u>.
    </div>
  );
};

export default RichTextDataInstancesDescription;
