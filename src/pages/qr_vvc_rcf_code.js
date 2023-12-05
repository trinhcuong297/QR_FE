import { Card, CardBody, CardHeader } from "@material-tailwind/react";
import QRCode from "qrcode.react";
import { useEffect, useState } from "react";

export default function QR() {

  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(
      `http://localhost:3000/GetAllTask/v23nabfkanxl5234aw654mbafhasdhf452343bwebfsajdchasdcre`
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
  }, []);

  return <div className="flex flex-wrap justify-between md:mx-16">
    {Array.isArray(data) ? data?.map((e, index) => {
      return <div className="px-2">
        <Card className="mt-6 w-96 flex flex-col items-center">
          <CardBody>
            <b>{e?.name}</b> - {e?.project_id[1]}
            <QRCode
              id='qrcode'
              value={e?.access_token + "n7af24"}
              size={290}
              level={'H'}
              includeMargin={true}
            />
          </CardBody>
        </Card>
      </div>
    }) : <></>}

  </div>
}