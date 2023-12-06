import { JSEncrypt } from "jsencrypt";
import { useEffect, useState } from "react";
import { Card, Form, Input, Button, Select } from "@arco-design/web-react";
import { getSchoolList, postLogin, getRSA } from "@/apis/user";
import { setToken, setUserInfo } from "@/store/modules/user";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import "./index.css";
const { Meta } = Card;
const FormItem = Form.Item;

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [schoolList, setSchoolList] = useState([]);

  const passwordEncryption = (userPassword: string, rsa: string) => {
    // RSA加密
    const encryptor = new JSEncrypt(); // 新建JSEncrypt对象
    encryptor.setPublicKey(rsa); // 设置公钥
    const passwordEncryp = encryptor.encrypt(userPassword); // 对密码进行加密
    return passwordEncryp;
  };

  const submitLogin = async (values: any) => {
    const { data: rsa } = await getRSA();
    const params = {
      ...values,
      roleId: 3,
    };
    params.password = passwordEncryption(params.password, rsa);
    const res: any = await postLogin(params);
    if (res.code === 200) {
      dispatch(setToken(res.data.token));
      dispatch(setUserInfo(res.data.user));
      navigate("/exercise");
    }
  };

  useEffect(() => {
    // 禁止页面缩放
    document.addEventListener(
      "mousewheel",
      function (e: any) {
        if ((e.wheelDelta && e.ctrlKey) || e.detail) {
          e.preventDefault();
        }
      },
      {
        capture: false,
        passive: false,
      }
    );

    async function getList() {
      const { data } = await getSchoolList();
      const newArr = data.map((item: any) => {
        return {
          label: item.name,
          value: item.id,
        };
      });
      setSchoolList(newArr);
    }
    getList();
  }, []);

  return (
    <div className="login-page">
      <div className="left-content">
        <div className="logo-container"></div>
        <div className="poster-container"></div>
      </div>

      <div className="login-content">
        <Card
          style={{ width: 460 }}
          cover={
            <div style={{ height: 204, overflow: "hidden" }}>
              <img
                style={{ width: "100%", transform: "translateY(-20px)" }}
                alt="dessert"
                src="//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
              />
            </div>
          }
        >
          <Meta
            description={
              <>
                <Form
                  onSubmit={(values) => submitLogin(values)}
                  style={{ width: 400, marginTop: 50 }}
                  autoComplete="off"
                >
                  <FormItem
                    label="学号"
                    field="username"
                    rules={[
                      { required: true, message: "username is required" },
                    ]}
                  >
                    <Input placeholder="please enter your Student number" />
                  </FormItem>
                  <FormItem
                    label="密码"
                    field="password"
                    rules={[
                      { required: true, message: "password is required" },
                    ]}
                  >
                    <Input.Password placeholder="please enter your password" />
                  </FormItem>
                  <FormItem
                    label="学校"
                    field="schoolId"
                    rules={[{ required: true, message: "school is required" }]}
                  >
                    <Select
                      placeholder="please select your university"
                      options={schoolList}
                      allowClear
                    />
                  </FormItem>
                  <FormItem style={{ paddingLeft: "84px" }}>
                    <Button htmlType="submit" type="primary" long>
                      登录
                    </Button>
                  </FormItem>
                </Form>
              </>
            }
          />
        </Card>
      </div>
    </div>
  );
}

export default Login;
