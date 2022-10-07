import _ from "lodash";
import { renderPropsComposer } from "@utils/props-composer";

_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

const Notification = ({ data }) => {
  return (
    <>
      {renderPropsComposer(
        {
          matcher: (props) => props.type === "success",
          render: (props) => {
            const iteratee = _.template(props.text)({
              user: props.payload.name,
            });
            return (
              <div className="flex items-center space-x-2 font-semibold">
                <div className="pr-4">10/07/2022</div>
                <div className="border-l border-main pl-4">
                  <div className="mr-2 inline">{iteratee}</div>
                  <span className="text-base underline cursor-pointer text-green-500 font-semibold">
                    Click vào đây để nhận quà.
                  </span>
                </div>
              </div>
            );
          },
        },
        {
          matcher: (props) => props.type === "warning",
          render: (props) => (
            <div className="flex items-center space-x-2 font-semibold">
              <div className="pr-4">09/07/2022</div>
              <div className="border-l border-main pl-4">
                <div>{props.text}</div>
              </div>
            </div>
          ),
        },
        {
          matcher: (props) => props.type === "error",
          render: (props) => {
            const iteratee = _.template(props.text)({
              company: props.payload.company,
            });
            return (
              <div>
                <div className="flex items-center space-x-2 font-semibold">
                  <div className="pr-4">08/07/2022</div>
                  <div className="border-l border-main pl-4">
                    <div className="text-red-500">{iteratee}</div>
                    <div className="cursor-pointer mt-2 rounded-lg bg-yellow-500 inline-block p-1 px-2 text-white">
                      Chi tiết lỗi
                    </div>
                  </div>
                </div>
              </div>
            );
          },
        }
      )(data)}
    </>
  );
};

export default function DemoComponent() {
  const notifications = [
    {
      id: 1,
      type: "success",
      text: "Chúc mừng {{ user }} đã trúng Iphone 1 4",
      payload: { name: "ahPhong" },
    },
    {
      id: 2,
      type: "warning",
      text: "Đây là warning notification",
    },
    {
      id: 3,
      type: "error",
      text: "Bạn bị từ chối truy cập vào {{ company }}",
      payload: { company: "META" },
    },
  ];

  return (
    <div className="bg-sky-50 rounded-lg p-6 shadow-lg">
      <h2 className="mb-6 text-2xl font-semibold">Notifications</h2>
      <div className="flex flex-col space-y-6 items-start">
        {_.map(notifications, (notification, index) => (
          <div className="w-full border-b pb-2 border-gray-400">
            <Notification data={notification} key={index} />
          </div>
        ))}
      </div>
    </div>
  );
}
