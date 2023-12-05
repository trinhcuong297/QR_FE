import { News_data } from "@/Data";
import { Meta } from "@/layout/meta";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Carousel,
    Button,
    IconButton,
    Textarea
} from "@material-tailwind/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export const getStaticPaths = async () => {
    // const res = await fetch(
    //     `https://vvcbackend.onrender.com/news/all`
    // );
    // const result = await res.json();
    const result = News_data;
    const paths = result ? result.map((tex) => {
        return {
            params: {
                id: tex.id.toString(),
            },
        };
    }) : [{
        params: {
            id: '1',
        },
    }];

    return {
        paths,
        fallback: true,
    };
};
export const getStaticProps = (context) => {
    const { id } = context.params;
    return {
        props: { id },
    };
};

export default function Page({ id }) {
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
        //     `https://vvcbackend.onrender.com/news/id/${id}`
        // )
        //     .then((res) => res.json())
        //     .then((data) => {
        //         setData(data);
        //     })
        // fetch(
        //     `https://vvcbackend.onrender.com/news/home_news/6`
        // )
        //     .then((res) => res.json())
        //     .then((data) => {
        //         setNews(data);
        //     })
        // setData(News_data.find((e) => e.id.toString() == id.toString()))
        // setNews(News_data.slice(0, 6))
    }, []);
    return <div>
        <Meta title="VVC - Tin tức" description="Công ty TNHH VVC Green - Bảo trì, bảo dưỡng, vận hành tòa nhà" />
        {id}
    </div>
}