import { PureComponent } from "react";
import { Table } from "antd";
import GridFilter from "./GridFilter";

class Grid extends PureComponent {
  onRow = record => {
    const { rowKey, onRowClick } = this.props;
    return { onClick: () => onRowClick(record[rowKey]) };
  };

  render() {
    const {
      data,
      rowKey,
      columns,
      filters,
      setFilters,
      disabledSearch,
      pagination
    } = this.props;

    return (
      <Table
        columns={columns}
        dataSource={data}
        rowKey={rowKey}
        pagination={pagination && data && data.length > 10 ? {} : false}
        sticky
        rowClassName="table-row"
        summary={() => (
          <Table.Summary fixed="top">
            <Table.Summary.Row>
              {columns.map(col =>
                col.filterable ? (
                  <Table.Summary.Cell index={col.index} key={col.dataIndex}>
                    <GridFilter
                      col={col}
                      onChange={e => setFilters(e)}
                      value={filters[col.dataIndex]}
                      disabledSearch={disabledSearch}
                    />
                  </Table.Summary.Cell>
                ) : (
                  <Table.Summary.Cell key={col.dataIndex} />
                )
              )}
            </Table.Summary.Row>
          </Table.Summary>
        )}
        onRow={this.onRow}
      />
    );
  }
}

export default Grid;
