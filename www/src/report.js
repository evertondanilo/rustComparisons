import { AlgMetrics } from "./constants";

export class Measurement {
    constructor(elapseTime, memory) {
        this.elapseTime = elapseTime;
        this.memory = memory;
    }

    calculateAvgOfItems(measurements) {
        measurements.forEach(m => {
            this.elapseTime += m.elapseTime;
            this.memory += m.memory;
        });
        this.elapseTime = this.elapseTime / measurements.length;
        this.memory = this.memory / measurements.length;
    }
}

export class Report {
    constructor(algName, algMetric, algType, dataSetSizes) {
        this.reportHeader = ['Algorithm'];
        this.reportRows = [algName];
        this.algMetric = algMetric;
        this.algName = algName;
        this.algType = algType;
        this.setHeaderSizes(dataSetSizes);
    }

    setHeaderSizes(dataSetSizes) {
        dataSetSizes.forEach(size => {
            this.reportHeader.push(size);
        });
    }

    addReportMeasurement(measurement) {
        const m = this.algMetric === AlgMetrics.memory ? measurement.memory : measurement.elapseTime;
        this.reportRows.push(m);
    }

    reportInfo() {
        return `Algorithm: ${this.algName}, Type: ${this.algType}, Metric: ${this.algMetric}`;
    }

    printTable() {
        function Values(header, row) {
            for (let index = 1; index < header.length; index++) {
                this[header[index]] = row[index];
            }
        }

        let row = {
            [this.algName]: new Values(this.reportHeader, this.reportRows)
        };

        console.log(this.reportInfo());
        console.table(row);
    }

    printCSV() {
        const header = this.reportHeader.join(",");
        const row = this.reportRows.join(",");
        console.log(this.reportInfo());
        console.log(header + "\n" + row);
    }
}