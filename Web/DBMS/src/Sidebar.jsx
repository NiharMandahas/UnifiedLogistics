import "./Sidebar.css";
import { useState } from "react";
import { MdOutlineMenu } from "react-icons/md";
import { IoAnalytics } from "react-icons/io5";
import { SiMongodb } from "react-icons/si";
import { PiFileSqlFill } from "react-icons/pi";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";

export default function Sidebar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const toggleButton = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={`Sidebar-button ${isOpen ? "expanded" : ""}`}>
        <MdOutlineMenu id="button" onClick={toggleButton} />
      </div>
      <div className={`Sidebar-main ${isOpen ? "open" : "closed"}`}>
      <div className="Sidebar-content" id="home" onClick={() => navigate("/")}>
        <FaHome  />&ensp;&ensp;Home
      </div>
        <div className="Sidebar-content" id="home" onClick={() => navigate("/Company")}>
          <IoAnalytics />&ensp;&ensp;Analytics
        </div>
        <div className="Sidebar-content" id="nosql" onClick={() => navigate("/NoSQL")}>
          <SiMongodb />&ensp;&ensp;NoSQL
        </div>
        <div className="Sidebar-content" id="sql" onClick={() => navigate("/SQL")}>
          <PiFileSqlFill />&ensp;&ensp;SQL
        </div>
        <div className="Sidebar-content" id="sql" onClick={() => navigate("/GetOrder")}>
          <FaEye />&ensp;&ensp;Order Status
        </div>
      </div>
    </>
  );
}
