import React from 'react';

function IconLabelList({ items }) {
  return (
    <ul className="icon-label-list">
      {items.map(({ icon: Icon, label }) => {
        return (
          <div className="icon-label-list-item" key={label}>
            <Icon className="list-item-icon" />
            <div className="list-item-label" dangerouslySetInnerHTML={{ __html: label }} />
          </div>
        );
      })}
    </ul>
  );
}

export default IconLabelList;
