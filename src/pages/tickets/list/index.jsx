/* eslint-disable no-unused-vars */
import { Avatar, Dropdown, Table, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { FaFilter, FaSortAmountUp } from "react-icons/fa";

import TicketData from "../../../_mock-data/tickets.json";
import { useState } from "react";
import dayjs from "dayjs";
import { BsThreeDotsVertical } from "react-icons/bs";

const colorItem = {
  HIGH: "bg-red-500",
  LOW: "bg-yellow-600",
  NORMAL: "bg-green-300",
};

const Index = () => {
  const { t } = useTranslation();

  const [list, setList] = useState(TicketData);

  const columns = [
    {
      title: t("tickets.column.ticketDetail"),
      dataIndex: "title",
      render: (value, record) => (
        <div className="flex space-x-2">
          <Avatar src={record.image} />
          <div>
            <Typography.Paragraph className="text-black">
              {value}
            </Typography.Paragraph>
            <Typography.Paragraph className="text-xs">
              Updated 1 day ago
            </Typography.Paragraph>
          </div>
        </div>
      ),
    },
    {
      title: t("tickets.column.customerName"),
      dataIndex: "customerName",
      render: (value, record) => (
        <div>
          <Typography.Paragraph className="text-black">
            {value}
          </Typography.Paragraph>
          <Typography.Paragraph className="text-xs">
            on 24.06.2024
          </Typography.Paragraph>
        </div>
      ),
    },
    {
      title: t("general.date"),
      dataIndex: "createdAt",
      render: (value, record) => (
        <div>
          <Typography.Paragraph className="text-black">
            {dayjs(value).format("MMMM DD, YYYY")}
          </Typography.Paragraph>
          <Typography.Paragraph className="text-xs">
            {dayjs(value).format("hh:mm A")}
          </Typography.Paragraph>
        </div>
      ),
    },
    {
      title: t("tickets.column.priority"),
      dataIndex: "priority",
      render: (value) => (
        <span
          className={`rounded-full px-2 py-1 text-xs text-white ${
            colorItem[value.toUpperCase()]
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      key: "sort",
      align: "center",
      width: 40,
      render: () => (
        <Dropdown
          menu={{
            items: [
              {
                label: t("general.detail"),
                key: "detail",
              },

              {
                label: t("general.approve"),
                key: "approve",
              },
              {
                label: t("general.reject"),
                key: "reject",
              },
            ],
            onClick: (key) => console.log(key),
          }}
        >
          <BsThreeDotsVertical className="cursor-pointer" />
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="bg-white rounded border">
      <div className="flex justify-between p-5">
        <Typography.Paragraph className="text-black">
          {t("tickets.allTicket")}
        </Typography.Paragraph>
        <div className="flex space-x-4">
          <div className="flex items-center  space-x-3">
            <FaSortAmountUp className="text-gray-400" />
            <Typography.Text>{t("general.sort")}</Typography.Text>
          </div>
          <div className="flex items-center space-x-3">
            <FaFilter className="text-gray-400" />
            <Typography.Text>{t("general.filter")}</Typography.Text>
          </div>
        </div>
      </div>
      <Table columns={columns} dataSource={list} rowKey="id" />
    </div>
  );
};

export default Index;
