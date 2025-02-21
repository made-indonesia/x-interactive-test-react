import Body from "@/components/atoms/Body";
import {
  PDFViewer,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {padding: 30},
  title: {fontSize: 18, marginBottom: 20, textAlign: "center"},
  table: {width: "100%", borderWidth: 1, borderColor: "#000"},
  tableRow: {flexDirection: "row"},
  tableColHeader: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#000",
    backgroundColor: "#e0e0e0",
    padding: 5,
  },
  tableCol: {flex: 1, borderWidth: 1, borderColor: "#000", padding: 5},
  tableCellHeader: {fontSize: 12, fontWeight: "bold"},
  tableCell: {fontSize: 12},
});

const MyDocument = ({
  data,
}: {
  data: Array<{
    username: string;
    email: string;
    name: string;
    customerNumber: string;
  }>;
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Customer Report</Text>

      <View style={styles.table}>
        {/* Table Header */}
        <View style={styles.tableRow}>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Username</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Email</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Name</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Customer Number</Text>
          </View>
        </View>

        {/* Table Data */}
        {data.map((item, index) => (
          <View style={styles.tableRow} key={index}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{item.username}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{item.email}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{item.name}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{item.customerNumber}</Text>
            </View>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

const PDFTableDisplay = () => {
  const customerData = [
    {
      username: "johndoe",
      email: "john@example.com",
      name: "John Doe",
      customerNumber: "CUST001",
    },
    {
      username: "janedoe",
      email: "jane@example.com",
      name: "Jane Doe",
      customerNumber: "CUST002",
    },
    {
      username: "alexsmith",
      email: "alex@example.com",
      name: "Alex Smith",
      customerNumber: "CUST003",
    },
  ];

  return (
    <div className="p-4">
      {/* <h1 className="text-xl font-bold mb-4">Customer Report PDF</h1> */}
      <Body className="mb-4 text-black">Customer Report PDF</Body>
      <PDFViewer width="100%" height="600">
        <MyDocument data={customerData} />
      </PDFViewer>
    </div>
  );
};

export default PDFTableDisplay;
