/* eslint-disable no-unused-vars */
import {
  Avatar,
  Button,
  Dropdown,
  Table,
  Typography,
  notification,
} from "antd";
import { useTranslation } from "react-i18next";
import { FaFilter, FaPlus, FaSortAmountUp } from "react-icons/fa";

import TicketData from "../../../_mock-data/tickets.json";
import { Fragment, useEffect, useState } from "react";
import dayjs from "dayjs";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setTicket,
  setTicketDetail,
  updateTicket,
} from "../../../store/ticketReducer";

const colorItem = {
  HIGH: "bg-red-500",
  LOW: "bg-yellow-600",
  NORMAL: "bg-green-300",
};

const Index = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const list = useSelector((state) => state.ticketReducer.list);

  useEffect(() => {
    if (list.length === 0) dispatch(setTicket(TicketData));
  }, []);

  const actionClick = (action, record) => {
    try {
      const payload = {
        title: record.title,
        priority: record.priority,
        description: record.priority,
        customerName: record.customerName,
        assignedTo: record.assignedTo,
        status: action,
        createdAt: record.createdAt,
        updatedAt: dayjs.utc().format(),
        closedAt: dayjs.utc().format(),
        image: "https://api.dicebear.com/8.x/lorelei/svg",
      };

      dispatch(updateTicket({ ...payload, id: Number(record?.id) }));
      notification.success({
        message: t(`tickets.${action}Success`),
      });
    } catch (error) {
      notification.error({
        message: t(`tickets.${action}Failed`),
      });
    }
  };

  const columns = [
    {
      title: t("tickets.column.ticketDetail"),
      dataIndex: "title",
      width: 400,
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
      width: 200,
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
      width: 200,
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
      width: 200,
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
      render: (_, record) => (
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
            onClick: (value) => {
              if (value.key === "detail") {
                dispatch(setTicketDetail(record));
                navigate(`/tickets/detail/${record.id}`);
              } else {
                actionClick(value.key, record);
              }
            },
          }}
        >
          <BsThreeDotsVertical className="cursor-pointer" />
        </Dropdown>
      ),
    },
  ];

  return (
    <Fragment>
      <div className="flex justify-end my-5">
        <Button
          className="flex items-center space-x-2 dark:bg-dark dark:text-gray-200"
          onClick={() => navigate("/tickets/create")}
        >
          <FaPlus className="text-gray-400" />
          {t("tickets.add")}
        </Button>
      </div>
      <div className="bg-white dark:bg-dark rounded border">
        <div className="flex justify-between p-5">
          <Typography.Paragraph className="text-black dark:text-gray-200">
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
        <Table
          columns={columns}
          dataSource={list}
          rowKey="id"
          pagination={{ pageSize: 5, total: list?.length }}
          scroll={{ x: 700 }}
          className="dark:text-gray-200 dark:bg-dark"
        />
      </div>
    </Fragment>
  );
};

export default Index;
