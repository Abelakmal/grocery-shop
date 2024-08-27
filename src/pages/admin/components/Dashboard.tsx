
import { Bar } from 'react-chartjs-2';
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title ,} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Legend);


const Dashboard = () => {
    const data = {
        labels: ['Red', 'Orange', 'Blue'],
        // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
        datasets: [
            {
              label: 'Popularity of colours',
              data: [55, 23, 96],
              // you can set indiviual colors for each bar
              backgroundColor: [
                'rgba(136 98 224)',
                'rgba(136 98 224)',
                'rgba(136 98 224)'
              ],
              borderWidth: 1,
            }
        ]
}
    
      const options:any = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Monthly Sales',
          },
        },
      };
  return (
    <div className="m-4">
      <h1 className="mb-4 font-bold text-white">Dashboard</h1>
      <div className="flex justify-between">
        <div className=" bg-[#8862E0] text-white p-2">
          <div className="flex justify-between">
          <div>
            <h2 className="text-black font-semibold">NEW ORDERS</h2>
            <p className="text-xl">39474</p>
            <p className="text-xs">2.00%{"(30 days)"}</p>
          </div>
          <img src="/cart.png" alt="cart" className="bg-white p-2 rounded-full h-max"/>
          </div>
          <div className="mt-4 bg-white">
            <Bar data={data}  options={options}/>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
