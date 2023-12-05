import { Meta } from "@/layout/meta";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Avatar,
    Tooltip,
    Typography,
    Carousel,
    Button,
    IconButton
} from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import Link from "next/link";
import { News_data } from "@/Data";

export default function News() {

    const [data, setData] = useState({});
    const [news, setNews] = useState([]);
    const [active, setActive] = useState(1);

    const getItemProps = (index) =>
    ({
        variant: active === index ? "filled" : "text",
        color: "gray",
        onClick: () => setActive(index),
    });

    const next = () => {
        if (active === 5) return;

        setActive(active + 1);
    };

    const prev = () => {
        if (active === 1) return;

        setActive(active - 1);
    };

    useEffect(() => {
        // fetch(
        //     `https://vvcbackend.onrender.com/news/page/${active}`
        // )
        //     .then((res) => res.json())
        //     .then((data) => {
        //         setNews(data);
        //     })

        // fetch(
        //     `https://vvcbackend.onrender.com/news/home_news/3`
        // )
        //     .then((res) => res.json())
        //     .then((data) => {
        //         setData(data);
        //     })
        setData(News_data.slice(0, 3))
        setNews(News_data.slice((active - 1) * 20, active * 20))
    }, [active]);

    return <>

    </>
}