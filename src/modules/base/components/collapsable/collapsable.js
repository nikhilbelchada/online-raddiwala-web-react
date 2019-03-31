import React from 'react';


const collapsable = (props) => {
  const divClasses = ["collapsible"].concat(props.divClasses || []);

  window.M.Collapsible.init(document.querySelectorAll('.collapsible'), {});

  return (
    <ul className={divClasses.join(" ")}>
      {
        props.rows.map(row => collapsableItem(props, row))
      }
    </ul>
  );
}

const collapsableItem = (props, row) => {
  const headerClasses = ["collapsible-header"].concat(props.headerClasses || []);
  const bodyClasses = ["collapsible-body"].concat(props.bodyClasses || []);

  return (
    <li key={"c-"+row.header}>
      <div className={headerClasses.join(" ")}>{row.header}</div>
      <div className={bodyClasses.join(" ")}>
        <span>{row.body}</span>
      </div>
    </li>
  );
};

export default collapsable;
