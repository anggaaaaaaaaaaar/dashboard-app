import {
  Button,
  DatePicker,
  Form,
  Input,
  Popconfirm,
  Select,
  notification,
} from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addTicket, updateTicket } from "../../../store/ticketReducer";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

const Index = () => {
  const { t } = useTranslation();
  const params = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const ticket = useSelector((state) => state.ticketReducer);

  useEffect(() => {
    if (params?.id) {
      form.setFieldsValue({
        ...ticket?.detail,
        date: dayjs(ticket?.detail?.createdAt),
      });
    }
  }, []);

  const onFinish = (values) => {
    try {
      const payload = {
        title: values.title,
        priority: values.priority,
        description: values.priority,
        customerName: values.customerName,
        assignedTo: values.assignedTo,
        status: "Open",
        updatedAt: dayjs.utc().format(),
        image: "https://api.dicebear.com/8.x/lorelei/svg",
      };

      if (params?.id) {
        dispatch(
          updateTicket({
            ...payload,
            id: Number(params?.id),
            createdAt: ticket?.detail?.createdAt,
            closedAt: ticket?.detail?.closedAt,
          })
        );
        notification.success({
          message: t("tickets.updateSuccess"),
        });
      } else {
        dispatch(
          addTicket({
            ...payload,
            id: ticket?.list?.length + 1,
            createdAt: dayjs.utc().format(),
            closedAt: null,
          })
        );
        notification.success({
          message: t("tickets.addSuccess"),
        });
      }
      navigate(-1);
    } catch (error) {
      notification.error({
        message: t("tickets.addFailed"),
      });
    }
  };

  const actionClick = (action) => {
    try {
      const payload = {
        title: ticket?.detail.title,
        priority: ticket?.detail.priority,
        description: ticket?.detail.priority,
        customerName: ticket?.detail.customerName,
        assignedTo: ticket?.detail.assignedTo,
        status: action,
        createdAt: ticket?.detail?.createdAt,
        updatedAt: dayjs.utc().format(),
        closedAt: dayjs.utc().format(),
        image: "https://api.dicebear.com/8.x/lorelei/svg",
      };

      dispatch(updateTicket({ ...payload, id: Number(params?.id) }));
      notification.success({
        message: t(`tickets.${action}Success`),
      });
    } catch (error) {
      notification.error({
        message: t(`tickets.${action}Failed`),
      });
    }
  };

  return (
    <div>
      <Button
        type="link"
        className="px-0 mt-3 lg:mt-0 mb-5 text-black flex items-center space-x-1"
        onClick={() => navigate(-1)}
      >
        <MdKeyboardArrowLeft size={24} className="text-black" />{" "}
        {t("general.back")}
      </Button>
      <Form
        onFinish={onFinish}
        name="form-ticket"
        form={form}
        layout="vertical"
        className="grid grid-cols-1 lg:grid-cols-2 gap-4"
        requiredMark={false}
      >
        <Form.Item
          name="title"
          label={t("tickets.detail.title")}
          rules={[{ required: true, message: t("form.required") }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="customerName"
          label={t("tickets.column.customerName")}
          rules={[{ required: true, message: t("form.required") }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="priority"
          label={t("tickets.column.priority")}
          rules={[{ required: true, message: t("form.required") }]}
        >
          <Select
            options={[
              { label: t("general.high"), value: "HIGH" },
              { label: t("general.low"), value: "LOW" },
              { label: t("general.normal"), value: "NORMAL" },
            ]}
          />
        </Form.Item>
        <Form.Item
          name="date"
          label={t("general.date")}
          rules={[{ required: true, message: t("form.required") }]}
        >
          <DatePicker className="w-full" />
        </Form.Item>
        <Form.Item
          name="assignedTo"
          label={t("tickets.detail.assignTo")}
          rules={[{ required: true, message: t("form.required") }]}
        >
          <Select
            options={[
              { label: "John Doe", value: "John Doe" },
              { label: "Smith Rowe", value: "Smith Rowe" },
              { label: "Emanuella", value: "Emanuella" },
            ]}
          />
        </Form.Item>
        <Form.Item
          name="description"
          label={t("tickets.detail.description")}
          rules={[{ required: true, message: t("form.required") }]}
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
      <div className="flex justify-end space-x-3">
        <Popconfirm
          title={t("tickets.detail.saveTask")}
          description={t("tickets.detail.saveTaskConfirm")}
          okText={t("general.yes")}
          cancelText={t("general.cancel")}
          onConfirm={() => form.submit()}
        >
          <Button type="primary" className="bg-green-500 hover:bg-green-800">
            {t("general.save")}
          </Button>
        </Popconfirm>
        {params?.id && (
          <>
            <Popconfirm
              title={t("tickets.detail.approveTask")}
              description={t("tickets.detail.approveTaskConfirm")}
              okText={t("general.yes")}
              cancelText={t("general.cancel")}
              onConfirm={() => actionClick("approve")}
            >
              <Button type="primary">{t("general.approve")}</Button>
            </Popconfirm>
            <Popconfirm
              title={t("tickets.detail.rejectTask")}
              description={t("tickets.detail.rejectTaskConfirm")}
              okText={t("general.yes")}
              cancelText={t("general.cancel")}
              onConfirm={() => actionClick("reject")}
            >
              <Button type="primary" danger>
                {t("general.reject")}
              </Button>
            </Popconfirm>
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
