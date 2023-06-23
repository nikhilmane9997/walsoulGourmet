import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import Datetime from 'react-datetime';
import _get from 'lodash/get';
import moment from 'moment';
import BootstrapTable from 'react-bootstrap-table/lib/BootstrapTable';
import TableHeaderColumn from 'react-bootstrap-table/lib/TableHeaderColumn';
import OneColumLeft from '../../components/MyAccount/OneColumnLeftMyAccount.jsx';

const ViewOrderColumn = (cell, row, props) => (
    <a className="view-order"
        onClick={() => props.handleViewOrder(_get(row, 'entity_id', ''))}
    >View Order</a>
);

const ViewInvoiceAndOpenTermOrderColumn = (cell, row, props) => (
    <span className="view-order"
        onClick={() => props.handleViewInvoiceOrder(cell)}
    >{cell}</span>
);

const DownloadColumn = (cell, row, props) => (
    // <span className="download-inv"
    //     onClick={() => props.handleDownload(_get(row, 'order_increment_id'), _get(row, 'invoice_increment_id'))}
    // >
        <a href={_get(row, 'download')} style={{ color: '#888' }}>Download</a>
        // {/* </span> */}
);

function removeTime(cell, row) {
    const remTime = moment(cell).format('YYYY-MM-DD');
    return (
        <div>{remTime}</div>
    );
}

function cancelAction(cell, row, props) {
    return (
        <span>
            
                
                        <a style={{ padding: '1px 12px',color:'#007baf' }}
                            // disabled
                            onClick={() => props.handleCancelSubscriptionOrder(row.box_count, row.entity_id)}
                        >
                            <span>View Order</span>
                        </a>
                        &nbsp; | &nbsp;
                        <a style={{ padding: '1px 12px',color:'#007baf' }}
                        // disabled
                        onClick={() => props.handleCancelSubscriptionOrder(row.box_count, row.entity_id)}
                        >
                        <span>Reorder</span>
                       </a>
              
        </span>
    );
}

function priceFormat(cell, row) {
    const priFor = Number(cell).toFixed(2);
    return (
        <div>{priFor}</div>
    );
}

export default function MyOrderComponent(props) {
    console.log(props);
    const resultData = props.orderRes.items;
    console.log(resultData);
    const selectRowProp = {
        mode: 'checkbox',
        // clickToSelect: false,
        selected: props.state.selected, // give a default selected row.
        unselectable: props.state.unselected,
        onSelect: props.onRowSelect,
        onSelectAll: props.onSelectAll,
    };
    const yesterday = Datetime.moment().subtract(7, 'day');
    const subDay = moment(_get(yesterday, '_d')).format('YYYY-MM-DD');

    let payClass;
    if (_get(props.state, 'selectedTotal') <= 0) {
        payClass = 'pay-method';
    } else if (_get(props.state, 'selectedTotal') > 0) {
        payClass = 'pay-meth';
    }

    return (
            <div className='container-block'>
                <div className="col-md-3 col-sm-4 col-xs-12" style={{marginTop:'140px'}}>
                                   <center>
                                    <div style={{backgroundColor:'#eaeaea',height:'400px',width:'250px'}}>
                                        <br/><br/>
                                    
                                        <p style={{color:'#000000'}}><a href="/customer/account">MY ACCOUNT</a></p><br/>
                                        <p><a style={{color:'rgb(138, 183, 125)'}} href="/customer/account/orders">MY ORDER</a></p><br/>
                                        <p style={{color:'#000000'}}><a href="/customer/account/address">MY ADDRESS BOOK</a></p><br/>
                                        <p style={{color:'#000000'}}><a href="/customer/account/reviews">MY RATINGS & REVIEWS</a></p><br/>
                                    </div>
                                 </center>
                </div>
                <div className="col-md-9 col-sm-9 col-xs-12"  style={{marginTop:'140px'}}>
                    <center><h3 style={{fontFamily: 'Quintessential'}}>My Orders</h3></center>
                    <div className="myOrder">
                        <BootstrapTable data={resultData} bordered={false} >
                            <TableHeaderColumn 
                                 width='10%'
                                dataField='entity_id' isKey={true}>
                                Order #
                            </TableHeaderColumn>
                            <TableHeaderColumn 
                                dataSize='18px'
                                dataAlign='created_at' width='15%'
                                dataField='date'
                                dataFormat={removeTime}>
                                Date
                            </TableHeaderColumn>
                            <TableHeaderColumn 
                                dataAlign='right' width='20%'
                                dataField='grand_total'>
                                Order Total
                            </TableHeaderColumn>
                           
                            <TableHeaderColumn 
                                dataAlign='center' width='20%'
                                dataField='status'>
                                Status
                            </TableHeaderColumn>
                            <TableHeaderColumn
                                dataAlign='center' width='35%'
                                dataField='entity_id'
                                dataFormat={(cell, row) => ViewOrderColumn(cell, row, props)}
                                >
                                Action/Id
                            </TableHeaderColumn>
                             
                        </BootstrapTable>
                    </div>
                </div>
               

            </div>
        );
}
