import { Layout, Typography } from "antd";
import { useCrypto } from "../../components/context/crypto-context";
import PortfolioChart from "./PartfolioChart";
import AssetsTable from "./AssetsTable";

const contentStyle = {
  textAlign: "center",
  minHeight: "calc(100vh - 60px)",
  color: "#fff",
  backgroundColor: "#001529",
  padding: "1rem",
};

export default function AppContent() {
  const { assets, crypto } = useCrypto();
  const cryptoPriceMap = crypto.reduce((acc , c) =>{
    acc[c.id] = c.price
    return acc
  }, {})
  return (
    <Layout.Content style={contentStyle}>
      <Typography.Title level={3} style={{ textAlign: "left", color: "white" }}>
        Portfolio:
        {assets
          .map((asset) => {
            return asset.amount * cryptoPriceMap[asset.id]
          })
          .reduce((acc, v) => (acc += v), 0)
          .toFixed(2)}
        $
      </Typography.Title>


      <PortfolioChart/>
      <AssetsTable/>


    </Layout.Content>

   
  );
}