import React from 'react'
import { Pivot, PivotItem } from "@fluentui/react"; 
import './Style.css';
import Currency_Table from './Currency_Table';


const CurrencyInfo = () => {
  return (
    <div id="Currency_main" className="">
    <Pivot className='bglightblue'>
      <PivotItem headerText="Currency">
      </PivotItem>
    </Pivot>
    <div>
      <Currency_Table/>
    </div> 
    </div>

  );
}

export default CurrencyInfo


