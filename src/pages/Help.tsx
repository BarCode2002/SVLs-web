import { useEffect, useState } from "react";
import { ipfsRetrieve, mongoList } from "../utils/ip";
import axios, { AxiosError } from "axios";
import { useParams } from "react-router-dom";

const Help = (): JSX.Element => {

  const { language } = useParams();
  const [cid, setCid] = useState('');

  useEffect(() => {
    const getPdf = async () => {
      try {
        console.log(language);
        const responseMongo = await axios.get(`${mongoList}pdf`);
        if (language == 'en') setCid(responseMongo.data[0].en)
        else setCid(responseMongo.data[1].es)
      } catch (error: any | AxiosError) {
        console.error("Unexpected error:", error);
      }
    }
    getPdf();
  }, []);

  return (
    <div>
      <iframe
        src={`${ipfsRetrieve}${cid}`}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          border: "none",
        }}
        title="PDF Viewer">
      </iframe>
    </div>
  );
};

export default Help;