import React from 'react';
import { Link } from 'react-router-dom';

var moment = require('moment');

const table = (props) => {
  return (
    <table>
        <thead>
          <tr>
              {props.headers.map(header => <th key={"h-"+header.key}>{header.name}</th>)}
          </tr>
        </thead>

        <tbody>
          {
            props.rows.length > 0 ? props.rows.map(row => (
              <tr key={"r-"+row.id}>
                {
                  props.headers.map(header => {
                    if(header.isLink) {
                      return (
                        <td key={"l-"+header.key}>
                          <Link to={header.linkPath + row[header.linkKey]}>
                            {header.value ? header.value : row[header.key]}
                          </Link>
                        </td>
                      );
                    }
                    if(header.type === 'datetime') {
                      return (
                        <td key={"l-"+header.key}>{moment(row[header.key]).format("YYYY-MM-DDThh:mm:ss")}</td>
                      )
                    }
                    return (
                      <td key={"l-"+header.key}>{row[header.key]}</td>
                    )
                  })
                }
              </tr>
            )) : <tr><td colSpan={Object.keys(props.headers).length}>No Data</td></tr>
          }
        </tbody>
      </table>
  );
}

export default table;
