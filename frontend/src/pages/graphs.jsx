import React, { useRef, useLayoutEffect,useEffect, useState} from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import axios from 'axios';
import { dns } from "../dns";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

am4core.useTheme(am4themes_animated);

function GraphPage(props) {
    const [graphData,setGraphData] = useState(null)
    const selectBox = useRef("")
    const fetch_data = async () =>{
        try{
            let response = await axios.get(`${dns}/insurance/graph`)
            setGraphData(response.data)
        }catch(error){
            console.log(error)
        }
      
    }
    const fetch_region_data = async (region) =>{
        try{
            let response = await axios.get(`${dns}/insurance/graph/${region}`)
            setGraphData(response.data)
        }catch(error){
            console.log(error)
        }
      
    }
    const onSelectHandler = () =>{
        let value = selectBox.current.value
        fetch_region_data(value)
    }
  useEffect(()=>{
    fetch_data()
  },[])
  const chart = useRef(null);

  useLayoutEffect(() => {
    let x = am4core.create("chartdiv", am4charts.XYChart);

    x.paddingRight = 20;

    
    

    x.data = graphData && graphData;

    let dateAxis = x.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;

    let valueAxis = x.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.minWidth = 35;

    let series = x.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = "policy_date";
    series.dataFields.valueY = "count";
    series.tooltipText = "{valueY.value}";
    x.cursor = new am4charts.XYCursor();

    let scrollbarX = new am4charts.XYChartScrollbar();
    scrollbarX.series.push(series);
    x.scrollbarX = scrollbarX;

    chart.current = x;

    return () => {
      x.dispose();
    };
  }, [graphData]);

  return (
      <>
       <br/>
          <Row>
             
              <Col lg={9}></Col>
              <Col lg={3}>
                  <Form.Select
                      aria-label='Select a region'
                      ref={selectBox}
                      onChange={onSelectHandler}
                  >
                      <option value="">Select a region</option>
                      <option value='North'>North</option>
                      <option value='South'>South</option>
                      <option value='West'>West</option>
                      <option value='East'>East</option>
                  </Form.Select>
              </Col>
              <div
                  id='chartdiv'
                  style={{ width: '100%', height: '500px' }}
              ></div>
          </Row>
      </>
  );
}
export default GraphPage;