import Datatable from "react-bs-datatable";
import axios from "axios";
import { useState, useEffect } from "react";
import { dns } from "../dns";


const header = [
    {
        prop: "policy_id",
        title: "Policy ID",
        sort: true,
        filterable: true
      },{
        prop: "customer_id",
        title: "Customer ID",
        sort: true,
        filterable: true

      },{
        prop: "fuel",
        title: "Fuel"
      },{
        prop: "vehicle_segment",
        title: "Vehicle Segment"
      },{
        prop: "premium",
        title: "Premium"
      },{
        prop: "bodily_injury_liability",
        title: "Bodily Injury Liability",
        cell: row => (
            row.bodily_injury_liability===1?<svg width="26" height="26" fill="#228B22" className="bi bi-check-all" viewBox="0 0 16 16">
            <path d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992a.252.252 0 0 1 .02-.022zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486-.943 1.179z"/>
          </svg>:<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#DC143C" class="bi bi-x-circle" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
</svg>
          )
      },{
        prop: "personal_injury_protection",
        title: "Personal Injury Protection",
        cell: row => (
            row.personal_injury_protection===1?<svg width="26" height="26" fill="#228B22" className="bi bi-check-all" viewBox="0 0 16 16">
            <path d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992a.252.252 0 0 1 .02-.022zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486-.943 1.179z"/>
          </svg>:<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#DC143C" class="bi bi-x-circle" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
</svg>
          )
      },{
        prop: "property_damage_liability",
        title: "Property Damage Liability",
        cell: row => (
            row.property_damage_liability===1?<svg width="26" height="26" fill="#228B22" className="bi bi-check-all" viewBox="0 0 16 16">
            <path d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992a.252.252 0 0 1 .02-.022zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486-.943 1.179z"/>
          </svg>:<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#DC143C" class="bi bi-x-circle" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
</svg>
          )
      },{
        prop: "collision",
        title: "Collision",
        cell: row => (
            row.collision===1?<svg width="26" height="26" fill="#228B22" className="bi bi-check-all" viewBox="0 0 16 16">
            <path d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992a.252.252 0 0 1 .02-.022zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486-.943 1.179z"/>
          </svg>:<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#DC143C" class="bi bi-x-circle" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
</svg>
          )
      },{
        prop: "comprehensive",
        title: "Comprehensive",
        cell: row => (
            row.comprehensive===1?<svg width="26" height="26" fill="#228B22" className="bi bi-check-all" viewBox="0 0 16 16">
            <path d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992a.252.252 0 0 1 .02-.022zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486-.943 1.179z"/>
          </svg>:<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#DC143C" class="bi bi-x-circle" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
</svg>
          )
      },{
        prop: "customer_gender",
        title: "Customer Gender"
      },{
        prop: "customer_income_group",
        title: "Customer Income Group"
      },{
        prop: "customer_region",
        title: "Customer Region"
      },{
        prop: "customer_marital_status",
        title: "Customer Marital Status",
        cell: row => (
          row.customer_marital_status===1?<svg width="26" height="26" fill="#228B22" className="bi bi-check-all" viewBox="0 0 16 16">
          <path d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992a.252.252 0 0 1 .02-.022zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486-.943 1.179z"/>
        </svg>:<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#DC143C" class="bi bi-x-circle" viewBox="0 0 16 16">
<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
</svg>
        )
      }
];

// const body = Array.from(new Array(57), () => {
//   const rd = (Math.random() * 10).toFixed(1);

//   if (rd > 0.5) {
//     return {
//       username: "i-am-billy",
//       realname: `Billy ${rd}`,
//       location: "Mars",
//       date: moment().subtract(1, "days").format("Do MMMM YYYY")
//     };
//   }

//   return {
//     username: "john-nhoj",
//     realname: `John ${rd}`,
//     location: "Saturn",
//     date: moment().subtract(2, "days").format("Do MMMM YYYY")
//   };
// });



export default function Table() {
const [data, setData] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    axios(`${dns}/insurance/all`).then((res) => {
      console.log(res.data);
      setData(res.data);
    });
  };
  return (
    <div className="App">
      <Datatable
        tableHeaders={header}
        tableBody={data}
        rowsPerPage={5}
        rowsPerPageOption={[5, 10, 15, 20]}
        initialSort={{ prop: "policy_id", isAscending: true }}
      />
    </div>
  );
}
