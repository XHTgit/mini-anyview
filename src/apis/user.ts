import { request } from "@/utils/index";

/** 获取学校列表 */
const getSchoolList = () => request.get("user-service/school/listAll");

/** 登录请求 */
const postLogin = (params: any) =>
  request.post("user-service/login", params, {
    headers: {
      "Content-Type":
        "multipart/form-data; boundary=----WebKitFormBoundaryVAJmk8GsedNoi2Hv",
    },
  });

/** 获取RSA密钥 */
const getRSA = () => request.get("user-service/rsa");

export { getSchoolList, postLogin, getRSA };
