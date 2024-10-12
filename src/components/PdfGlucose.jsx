import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Definimos los estilos
const styles = StyleSheet.create({
  page: {
    padding: 20,
    flexDirection: "row",
    backgroundColor: "#fff",
  },
  table: {
    display: "table",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    tableLayout: "fixed",
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCellHeader: {
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center",
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#000",
    padding: 5,
    width: "12.5%",
    minHeight: 40, // Para asegurarse de que las celdas sean más grandes verticalmente
    flexDirection: "column",
  },
  tableCell: {
    fontSize: 10,
    textAlign: "center",
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#000",
    padding: 5,
    flexGrow: 1,
    minHeight: 40, // Para asegurarse de que las celdas sean más grandes verticalmente
  },
  firstColumnCell: {
    fontWeight: "bold",
    textAlign: "left",
    paddingLeft: 10,
  },
  lastColumn: {
    borderRightWidth: 0,
  },
  lastRow: {
    borderBottomWidth: 0,
  },
  waterCell: {
    width: "87.5%",
  },
});

// Componente del documento
export default function MyDocument({ data }) {
  console.log(data);
  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        <View style={styles.table}>
          {/* Encabezado de la tabla */}
          <View style={styles.tableRow}>
            <Text style={[styles.tableCellHeader]}>
              <Text>
                Fecha
                <Text style={{ fontSize: 10, paddingTop: "2px" }}>
                  {"\n"}
                  {data.date}
                </Text>
              </Text>
            </Text>
            <Text style={styles.tableCellHeader}>Desayuno</Text>
            <Text style={styles.tableCellHeader}>Colación Matutina</Text>
            <Text style={styles.tableCellHeader}>Comida</Text>
            <Text style={styles.tableCellHeader}>Colación Vespertina</Text>
            <Text style={styles.tableCellHeader}>Ejercicio</Text>
            <Text style={styles.tableCellHeader}>Cena</Text>
            <Text style={[styles.tableCellHeader, styles.lastColumn]}>
              Madrugada
            </Text>
          </View>
          {/* Filas de datos */}

          <View style={styles.tableRow}>
            <Text style={[styles.tableCellHeader, styles.firstColumnCell]}>
              Glucosa
            </Text>
            <View style={styles.tableCellHeader}>
              <View style={{ flexDirection: "row" }}>
                <View style={{ flexDirection: "column", width: "50%" }}>
                  <Text>Pre</Text>
                  {data.glucose.map((glucose) => {
                    return (
                      <Text>
                        {glucose.medition === "Prepandrial - Desayuno" &&
                          glucose.glucose}
                      </Text>
                    );
                  })}
                </View>
                <View style={{ flexDirection: "column", width: "50%" }}>
                  <Text>Pos</Text>
                  {data.glucose.map((glucose) => {
                    return (
                      <Text>
                        {glucose.medition === "Postpandrial - Desayuno" &&
                          glucose.glucose}
                      </Text>
                    );
                  })}
                </View>
              </View>
            </View>
            <View style={styles.tableCellHeader}>
              <View style={{ flexDirection: "row" }}>
                <View style={{ flexDirection: "column", width: "50%" }}>
                  <Text>Pre</Text>
                  {data.glucose.map((glucose) => {
                    return (
                      <Text>
                        {glucose.medition ===
                          "Prepandrial - Colacion Matutina" && glucose.glucose}
                      </Text>
                    );
                  })}
                </View>
                <View style={{ flexDirection: "column", width: "50%" }}>
                  <Text>Pos</Text>
                  {data.glucose.map((glucose) => {
                    return (
                      <Text>
                        {glucose.medition ===
                          "Postpandrial - Colacion Matutina" && glucose.glucose}
                      </Text>
                    );
                  })}
                </View>
              </View>
            </View>
            <View style={styles.tableCellHeader}>
              <View style={{ flexDirection: "row" }}>
                <View style={{ flexDirection: "column", width: "50%" }}>
                  <Text>Pre</Text>
                  {data.glucose.map((glucose) => {
                    return (
                      <Text>
                        {glucose.medition === "Prepandrial - Comida" &&
                          glucose.glucose}
                      </Text>
                    );
                  })}
                </View>
                <View style={{ flexDirection: "column", width: "50%" }}>
                  <Text>Pos</Text>
                  {data.glucose.map((glucose) => {
                    return (
                      <Text>
                        {glucose.medition === "Postpandrial - Comida" &&
                          glucose.glucose}
                      </Text>
                    );
                  })}
                </View>
              </View>
            </View>
            <View style={styles.tableCellHeader}>
              <View style={{ flexDirection: "row" }}>
                <View style={{ flexDirection: "column", width: "50%" }}>
                  <Text>Pre</Text>
                  {data.glucose.map((glucose) => {
                    return (
                      <Text>
                        {glucose.medition ===
                          "Prepandrial - Colación Vespertina" &&
                          glucose.glucose}
                      </Text>
                    );
                  })}
                </View>
                <View style={{ flexDirection: "column", width: "50%" }}>
                  <Text>Pos</Text>
                  {data.glucose.map((glucose) => {
                    return (
                      <Text>
                        {glucose.medition ===
                          "Postpandrial - Colación Vespertina" &&
                          glucose.glucose}
                      </Text>
                    );
                  })}
                </View>
              </View>
            </View>
            <View style={styles.tableCellHeader}>
              <View style={{ flexDirection: "row" }}>
                <View style={{ flexDirection: "column", width: "50%" }}>
                  <Text>Pre</Text>
                  {data.glucose.map((glucose) => {
                    return (
                      <Text>
                        {glucose.medition === "Antes - Ejercicio" &&
                          glucose.glucose}
                      </Text>
                    );
                  })}
                </View>
                <View style={{ flexDirection: "column", width: "50%" }}>
                  <Text>Pos</Text>
                  {data.glucose.map((glucose) => {
                    return (
                      <Text>
                        {glucose.medition === "Después - Ejercicio" &&
                          glucose.glucose}
                      </Text>
                    );
                  })}
                </View>
              </View>
            </View>
            <View style={styles.tableCellHeader}>
              <View style={{ flexDirection: "row" }}>
                <View style={{ flexDirection: "column", width: "50%" }}>
                  <Text>Pre</Text>
                  {data.glucose.map((glucose) => {
                    return (
                      <Text>
                        {glucose.medition === "Prepandrial - Cena" &&
                          glucose.glucose}
                      </Text>
                    );
                  })}
                </View>
                <View style={{ flexDirection: "column", width: "50%" }}>
                  <Text>Pos</Text>
                  {data.glucose.map((glucose) => {
                    return (
                      <Text>
                        {glucose.medition === "Postpandrial - Cena" &&
                          glucose.glucose}
                      </Text>
                    );
                  })}
                </View>
              </View>
            </View>
            <View style={[styles.tableCellHeader, styles.lastColumn]}>
              <View style={{ flexDirection: "row" }}>
                <View style={{ flexDirection: "column", width: "50%" }}>
                  {data.glucose.map((glucose) => {
                    return (
                      <Text>
                        {glucose.medition === "Nocturna" && glucose.glucose}
                      </Text>
                    );
                  })}
                </View>
              </View>
            </View>
          </View>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCellHeader, styles.firstColumnCell]}>
              Dosis insulina
            </Text>
            <Text style={styles.tableCellHeader}>
              {data.insuline.map((insulin) => {
                return (
                  <Text>
                    {insulin.medition === "Desayuno" && (
                      <Text>
                        {insulin.dose} / {insulin.insulineType}
                      </Text>
                    )}
                  </Text>
                );
              })}
            </Text>
            <Text style={styles.tableCellHeader}>
              {data.insuline.map((insulin) => {
                return (
                  <Text>
                    {insulin.medition === "Colacion Matutina" && (
                      <Text>
                        {insulin.dose} / {insulin.insulineType}
                      </Text>
                    )}
                  </Text>
                );
              })}
            </Text>
            <Text style={styles.tableCellHeader}>
              {data.insuline.map((insulin) => {
                return (
                  <Text>
                    {insulin.medition === "Comida" && (
                      <Text>
                        {insulin.dose} / {insulin.insulineType}
                      </Text>
                    )}
                  </Text>
                );
              })}
            </Text>
            <Text style={styles.tableCellHeader}>
              {data.insuline.map((insulin) => {
                return (
                  <Text>
                    {insulin.medition === "Colacion Vespertina" && (
                      <Text>
                        {insulin.dose} / {insulin.insulineType}
                      </Text>
                    )}
                  </Text>
                );
              })}
            </Text>
            <Text style={styles.tableCellHeader}>
              {data.insuline.map((insulin) => {
                return (
                  <Text>
                    {insulin.medition === "Ejercicio" && (
                      <Text>
                        {insulin.dose} / {insulin.insulineType}
                      </Text>
                    )}
                  </Text>
                );
              })}
            </Text>
            <Text style={styles.tableCellHeader}>
              {data.insuline.map((insulin) => {
                return (
                  <Text>
                    {insulin.medition === "Cena" && (
                      <Text>
                        {insulin.dose} / {insulin.insulineType}
                      </Text>
                    )}
                  </Text>
                );
              })}
            </Text>
            <Text style={[styles.tableCellHeader, styles.lastColumn]}>
              {data.insuline.map((insulin) => {
                return (
                  <Text>
                    {insulin.medition === "Madrugada" && (
                      <Text>
                        {insulin.dose} / {insulin.insulineType}
                      </Text>
                    )}
                  </Text>
                );
              })}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCellHeader, styles.firstColumnCell]}>
              Agua
            </Text>
            <Text
              style={[
                styles.tableCellHeader,
                styles.waterCell,
                styles.lastColumn,
              ]}
            >
              {data.water.map((water) => {
                return <Text>{water.water * 250} ml</Text>;
              })}
            </Text>
          </View>
          <View style={[styles.tableRow, styles.lastRow]}>
            <Text style={[styles.tableCellHeader, styles.firstColumnCell]}>
              Día atípico
            </Text>
            <Text
              style={[
                styles.tableCellHeader,
                styles.waterCell,
                styles.lastColumn,
              ]}
            >
              {data.atipicDay.map((atipic) => {
                return (
                  <Text>
                    {atipic.atipicDay === "Otro..."
                      ? atipic.otherAtipicDay
                      : atipic.atipicDay}
                    {"\n"}
                  </Text>
                );
              })}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
