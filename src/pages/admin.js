import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Checkbox,
    Button,
    Tabs,
    TabsHeader,
    Tab,
    TabsBody,
    TabPanel
} from "@material-tailwind/react";
import Image from "next/image";
import { useSelector, useDispatch } from 'react-redux'
import { setLogin, setLogout } from "@/redux/feature/login";
import { Meta } from "@/layout/meta";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
})
const modules = {
    toolbar: [
        [{ header: '1' }, { header: '2' }, { font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'color': [] }, { 'background': [] }],
        [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
        ],
        ['link', 'image', 'video'],
        ['clean'],
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    },
}
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
]

export default function LoginCard() {
    const [activeTab, setActiveTab] = useState("home");
    const [loading, setLoading] = useState(0);
    const [HomeData, setHomeData] = useState({});
    const [AboutData, setAboutData] = useState({});
    const [Hero_newsData, setHero_newsData] = useState({});
    const [NewsData, setNewsData] = useState([]);
    const loginState = useSelector(state => state.loginState.value)
    const dispatch = useDispatch()
    const handleLogin = async (event) => {
        event.preventDefault();
        const Data = {
            Email: event.target.Email.value,
            Password: event.target.Password.value
        }
        setLoading(1);
        await fetch(`https://vvcbackend.onrender.com/admin/login`, {
            method: "POST",
            body: JSON.stringify(Data),
            headers: {
                "content-type": "application/json",
                "Access-Control-Allow-Origin": "http://localhost:3000",
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res == 1) {
                    setLoading(0);
                    dispatch(setLogin())
                }
                else {
                    setLoading(0);
                    dispatch(setLogout())
                }
            })
    }

    useEffect(() => {
        if (loginState) {
            fetch(
                `https://vvcbackend.onrender.com/home`
            )
                .then((res) => res.json())
                .then((data) => {
                    setHomeData(data);
                })

            fetch(
                `https://vvcbackend.onrender.com/news/all`
            )
                .then((res) => res.json())
                .then((data) => {
                    setNewsData(data);
                })

            fetch(
                `https://vvcbackend.onrender.com/news/hero`
            )
                .then((res) => res.json())
                .then((data) => {
                    setHero_newsData(data);
                })

            fetch(
                `https://vvcbackend.onrender.com/aboutus`
            )
                .then((res) => res.json())
                .then((data) => {
                    setAboutData(data);
                })
        }
    }, [loginState])
    const data = [
        {
            label: "Trang chủ",
            value: "home",
        },
        {
            label: "Giới thiệu",
            value: "about",
        },
        {
            label: "Tin tức",
            value: "news",
        }
    ];
    return (
        <div className="w-full h-screen mt-[12rem] flex justify-center">
            <Meta title="VVC - Admin dashboard" description="Công ty TNHH VVC Green - Bảo trì, bảo dưỡng, vận hành tòa nhà" />
            <form onSubmit={handleLogin} className={loginState ? "hidden" : ""}>
                <Card className="w-96">
                    <CardHeader
                        // variant="gradient"
                        // color="gray"
                        className="mb-8 grid h-fit place-items-center shadow-none"
                    >
                        <Image src={`/vvc_logo.png`} width={300} height={300} />
                    </CardHeader>
                    <CardBody className="flex flex-col gap-4">
                        <Input label="Email" size="lg" name="Email" />
                        <Input label="Password" size="lg" name="Password" type="password" />
                        <div className="-ml-2.5">
                            <Checkbox label="Remember Me" />
                        </div>
                    </CardBody>
                    <CardFooter className="pt-0">
                        {loading ? <Button variant="gradient" fullWidth>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-6 animate-spin">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                            </svg>
                        </Button> : <Button variant="gradient" fullWidth type="submit">
                            Sign In
                        </Button>}
                        <Link href="/">
                            <Typography variant="small" className="mt-6 flex justify-center">
                                Forgot your password?
                            </Typography>
                        </Link>
                    </CardFooter>
                </Card>
            </form>
            <Tabs value={activeTab} className={!loginState ? "hidden" : "w-full px-1 md:px-6 lg:px-12"}>
                <TabsHeader
                    className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
                    indicatorProps={{
                        className:
                            "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
                    }}
                >
                    {data.map(({ label, value }) => (
                        <Tab
                            key={value}
                            value={value}
                            onClick={() => setActiveTab(value)}
                            className={activeTab === value ? "text-gray-900" : ""}
                        >
                            {label}
                        </Tab>
                    ))}
                </TabsHeader>
                <TabsBody>
                    {data.map(({ value }) => (
                        <TabPanel key={value} value={value}>
                            {
                                value == "home" ? <>

                                </> : <></>
                            }
                            {
                                value == "news" ? <>
                                    <div className="w-full flex flex-col items-center">
                                        <QuillNoSSRWrapper modules={modules} formats={formats} theme="snow" onChange={(e) => { console.log(e.valueOf()) }} className="w-3/4" />
                                    </div>

                                </> : <></>
                            }
                            {
                                value == "about" ? <>
                                    fsdg
                                </> : <></>
                            }
                        </TabPanel>
                    ))}
                </TabsBody>
            </Tabs>
        </div>
    );
}