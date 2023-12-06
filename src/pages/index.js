import { Card, CardBody, CardFooter, CardHeader, Checkbox, Input, Button, Typography } from "@material-tailwind/react";
import { QrScanner } from "@yudiel/react-qr-scanner";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { setLogin, setLogout } from "@/redux/feature/login";
import Image from "next/image";

export default function Home() {

  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [qr_active, setQr_active] = useState(true);
  const [sending, setSending] = useState(false);
  const [codeAccept, setCodeAccept] = useState(0);
  const [user, setUser] = useState();
  const [formRes, setFormRes] = useState();
  const [userID, setUserID] = useState();
  const loginState = useSelector(state => state.loginState.value)
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    await event.preventDefault();
    const Data = {
      email: event.target.Email.value,
      password: event.target.Password.value
    }
    setLoading(1);
    await fetch(`https://vvcqr.io.vn/Login`, {
      method: "POST",
      body: JSON.stringify(Data),
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "https://vvcqr.io.vn",
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data) {
          setUser(data)
        }
        setLoading(0)
      })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const Data = {
      data: formData
    }
    setSending(1);
    await fetch(`https://vvcqr.io.vn/Upload`, {
      method: "POST",
      body: formData,
      headers: {
        // "content-type": "multipart/form-data",
        "Access-Control-Allow-Origin": "https://vvcqr.io.vn",
      }
    })
      .then(res => res.json())
      .then(res => {
        setFormRes(res)
        setSending(0)
        setCodeAccept(0)
        setQr_active(true)
      })
  }

  useEffect(() => {
    if (user) {
      dispatch(setLogin())
      fetch(
        `https://vvcqr.io.vn/GetTask/${user.work_email}`
      )
        .then((res) => res.json())
        .then((data) => {
          setData(data);
        })
    }
  }, [user, loginState]);

  if (!loginState) {
    return <div className="w-full h-screen flex flex-col items-center justify-center">
      <form onSubmit={handleLogin} className={loginState ? "hidden" : ""}>
        <CardHeader
          // variant="gradient"
          // color="gray"
          className="mb-8 grid h-fit place-items-center shadow-none"
        >
          <Typography variant="h3" color="black" className="mt-6 flex justify-center">
            Đăng nhập
          </Typography>
        </CardHeader>
        <Card className="w-96">
          <CardBody className="flex flex-col gap-4">
            <Input label="Email" size="lg" name="Email" />
            <Input label="Mật khẩu" size="lg" name="Password" type="password" />
            <div className="-ml-2.5">
              <Checkbox label="Ghi nhớ đăng nhập" />
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            {loading ? <Button variant="gradient" fullWidth>
              <svg xmlns="https://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-6 animate-spin">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
              </svg>
            </Button> : <Button variant="gradient" fullWidth type="submit">
              Đăng nhập
            </Button>}
          </CardFooter>
        </Card>
      </form>
    </div>
  }

  if (loginState) {
    return <>
      <div className="w-full flex flex-col items-center px-2">
        <h1 className="text-3xl font-bold mt-8 text-gray-800">Xin chào {user?.name}</h1>
        {Array.isArray(data) ? data.map((e, index) => {
          return <Card className="w-full md:w-3/4 lg:w-1/2 my-4 bg-gray-100" key={index}>
            <CardBody>
              <h1 className="text-2xl"><b>{e?.name}</b> - {e?.project_id[1]}</h1>
              <p>{e?.portal_user_names}</p>
              <hr className="my-4" />
              <h4 className="text-md font-medium leadi" dangerouslySetInnerHTML={{
                __html: e?.description ? e?.description : '',
              }}
                suppressHydrationWarning={true}>
              </h4>
            </CardBody>
          </Card>
        }) : <></>}
      </div>
      <div className={`flex flex-col items-center ${codeAccept ? "hidden" : ""}`}>
        <div className="w-full md:w-[25rem]">
          <QrScanner
            onDecode={(result) => {
              if (result.endsWith("n7af24") && data?.find((e) => e.access_token == result.slice(0, -6))?.name) {
                setCodeAccept(result.slice(0, -6))
                setQr_active(false)
              }
            }}
            onError={(error) => console.log(error?.message)}
            stopDecoding={!qr_active}
          />
        </div>
      </div>
      <hr className="my-4" />
      <h1 className="text-4xl font-bold w-full text-center">{formRes}</h1>
      <form onSubmit={handleSubmit}>
        <div className={`${codeAccept ? "" : "hidden"} w-full flex flex-col items-center px-2 my-4`}>
          <div className="md:w-3/4 lg:w-1/2 w-full rounded-md bg-gray-100 px-2">
            <h1 className="text-3xl font-bold mt-2 mb-4 text-gray-800">{data?.find((e) => e.access_token == codeAccept)?.name}</h1>
            <input name="user_id" value={user?.id} type="number" hidden />
            <input name="project_id" value={data?.find((e) => e.access_token == codeAccept)?.project_id[0]} type="number" hidden />
            <input name="task" value={data?.find((e) => e.access_token == codeAccept)?.name} type="text" hidden />
            <Input name="error" type="text" label="Báo lỗi" />
            <div className="mt-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="imgFile"
              >
                Ảnh kiểm tra (có thể chọn nhiều ảnh)*
              </label>
              <input
                required
                name="imgFiles"
                type="file"
                multiple
                className="file-input file-input-bordered file-input-info w-full max-w-xs"
              />
            </div>
            <div className="flex items-center justify-center">
              {!sending ? (
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Gửi kết quả
                </button>
              ) : (
                <svg
                  role="status"
                  className="inline h-8 w-8 animate-spin mr-2 text-gray-200 dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="https://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              )}
            </div>
          </div>
        </div>
      </form>
    </>
  }
}