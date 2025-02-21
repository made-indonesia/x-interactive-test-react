import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {flexDirection: "column", padding: 30},
  section: {marginBottom: 10, padding: 10, border: "1pt solid #000"},
  title: {fontSize: 18, marginBottom: 10, textAlign: "center"},
});

const MyDocument = ({
  customerId,
  customerName,
}: {
  customerId: string;
  customerName: string;
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Customer Report</Text>
      <View style={styles.section}>
        <Text>Customer ID: {customerId}</Text>
      </View>
      <View style={styles.section}>
        <Text>Customer Name: {customerName}</Text>
      </View>
    </Page>
  </Document>
);

const PDFGenerator = () => {
  const customerData = {customerId: "CUST12345", customerName: "John Doe"};

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Generate PDF</h1>
      <PDFDownloadLink
        document={<MyDocument {...customerData} />}
        fileName="customer-report.pdf">
        {({loading}) => (
          <button className="px-4 py-2 bg-blue-500 text-white rounded">
            {loading ? "Generating PDF..." : "Download PDF"}
          </button>
        )}
      </PDFDownloadLink>
    </div>
  );
};

export default PDFGenerator;
