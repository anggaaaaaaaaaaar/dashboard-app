import { Radio, Typography } from "antd";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import dayjs from "dayjs";
import { useState } from "react";
import { Line } from "react-chartjs-2";
import { BiSolidPlusSquare } from "react-icons/bi";
import DashboardData from "../../_mock-data/dashboard.json";
import { useNavigate } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const colorItem = {
  URGENT: "bg-yellow-500 text-white",
  NEW: "bg-cyan-600 text-white",
  DEFAULT: "bg-gray-300 text-gray-400",
};

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

const Index = () => {
  const navigate = useNavigate();

  const [headerSelect, setHeaderSelect] = useState("");

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "bottom",
      },
      title: {
        display: false,
        text: "Chart.js Line Chart",
      },
    },
    scales: {
      y: {
        min: 0,
        max: 100,
      },
    },
  };

  const labels = Array.from({ length: 22 }, (_, index) => index);

  const data = {
    labels,
    datasets: [
      {
        label: "Today",
        data: labels.map(() => getRandomInt(0, 100)),
        borderColor: "rgb(37, 99, 235)",
        backgroundColor: "rgba(37, 99, 235,1)",
        tension: 0.5,
        pointStyle: false,
      },
      {
        label: "Yesterday",
        data: labels.map(() => getRandomInt(0, 100)),
        borderColor: "rgb(156, 163, 175)",
        backgroundColor: "rgba(156, 163, 175, 0.5)",
        tension: 0.5,
        pointStyle: false,
      },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {DashboardData.header.map((item, index) => (
          <button
            id={`btn=${item.title}`}
            key={index}
            className={`bg-white flex flex-col items-center justify-center gap-2 p-5 lg:p-10 border rounded group hover:border-blue-600 ${
              index === headerSelect ? "border-blue-600" : ""
            }`}
            onClick={() => setHeaderSelect(index)}
          >
            <Typography.Paragraph
              className={`font-semibold group-hover:text-blue-600  ${
                index === headerSelect ? "text-blue-600" : ""
              }`}
            >
              {item.title}
            </Typography.Paragraph>
            <Typography.Paragraph
              className={`text-3xl font-semibold group-hover:text-blue-600  ${
                index === headerSelect ? "text-blue-600" : "text-black "
              }`}
            >
              {item.value}
            </Typography.Paragraph>
          </button>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row bg-white rounded border">
        <div className="flex-[3] p-5">
          <Typography.Paragraph className="text-sm lg:text-base text-black">
            Today&apos;s trends
          </Typography.Paragraph>
          <div className="flex justify-between">
            <Typography.Text className="text-xxs lg:text-xs">
              as of{dayjs().format(" DD MMMM YYYY, hh:mm A")}
            </Typography.Text>
            <div className="flex flex-col lg:flex-row lg:space-x-3">
              <div className="flex items-center space-x-2">
                <span className="block bg-blue-600 w-4 h-1 rounded-full"></span>
                <Typography.Text className=" text-xxs lg:text-xs">
                  Today
                </Typography.Text>
              </div>

              <div className="flex items-center space-x-2">
                <span className="block bg-gray-400 w-4 h-1 rounded-full"></span>
                <Typography.Text className=" text-xxs lg:text-xs">
                  Yesterday
                </Typography.Text>
              </div>
            </div>
          </div>
          <Line options={options} data={data} />
        </div>
        <div className="flex-[1] grid grid-cols-1 gap-2 border-l">
          {DashboardData.chart.data.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col items-center justify-center gap-2 p-4 ${
                index !== 0 ? "border-t" : ""
              }`}
            >
              <Typography.Text>{item.title}</Typography.Text>
              <Typography.Text className="text-black font-medium text-base">
                {item.value}
              </Typography.Text>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded border">
          <div className="flex justify-between p-5">
            <Typography.Paragraph className="text-base text-black">
              Unresolved tickets
            </Typography.Paragraph>
            <button
              className="text-blue-600"
              onClick={() => navigate("/tickets")}
            >
              View details
            </button>
          </div>
          <Typography.Paragraph className="text-xs px-5">
            Group:{" "}
            <Typography.Text className="text-xs font-medium text-black">
              Support
            </Typography.Text>
          </Typography.Paragraph>
          <div className="p-5">
            {DashboardData.unresolved_tickets.map((item, index) => (
              <div
                key={index}
                className={`flex justify-between py-3 ${
                  index !== 0 ? "border-t" : ""
                }`}
              >
                <Typography.Text className="font-medium">
                  {item.title}
                </Typography.Text>
                <Typography.Text>{item.value}</Typography.Text>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded border">
          <div className="flex justify-between p-5">
            <Typography.Paragraph className="text-base text-black">
              Tasks
            </Typography.Paragraph>
            <button className="text-blue-600">View details</button>
          </div>
          <Typography.Paragraph className="text-xs px-5">
            Today
          </Typography.Paragraph>
          <div>
            <div className={`flex justify-between py-3 px-5`}>
              <Typography.Text className="font-medium text-gray-100/1">
                Create new task
              </Typography.Text>
              <BiSolidPlusSquare size={20} className="text-gray-400" />
            </div>
            <Radio.Group name="radio-task" className="w-full">
              {DashboardData.task.map((item, index) => (
                <div
                  key={index}
                  className={`flex justify-between py-3 px-5 border-t`}
                >
                  <Radio value={item.title}>
                    <Typography.Text className="font-medium">
                      {item.title}
                    </Typography.Text>
                  </Radio>
                  <Typography.Text
                    className={`bg-cyan-600 rounded px-4 ${
                      colorItem[item.value]
                    }`}
                  >
                    {item.value}
                  </Typography.Text>
                </div>
              ))}
            </Radio.Group>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
