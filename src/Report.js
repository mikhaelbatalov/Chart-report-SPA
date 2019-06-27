import React, { Component } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import products from './data';

class Report extends Component {
  constructor(props) {
    super(props);

    const arrayOfYears = products.map(item => item.year).filter((value, index, array) => array.indexOf(value) === index);
    const maxOfYears = Math.max.apply(null, arrayOfYears);

    this.updateYear = this.updateYear.bind(this);
    this.updateMode = this.updateMode.bind(this);

    this.state = {

      allProducts: products,

      years: arrayOfYears,

      displayYear: maxOfYears,

      chartDisplayMode: 'Goods',

      chartOptions: {
        title: {
          text: 'Goods'
        },
        subtitle: {
          text: 'for ' + maxOfYears
        },
        xAxis: {
          title: {
            text: 'Feature 1'
          }
        },
        yAxis: {
          title: {
            text: 'Feature 2'
          }
        },
        chart: {
          type: 'scatter',
          marginRight: 350
        },
        legend: {
          align: 'right',
          verticalAlign: 'top',
          horizontalAlign: 'left',
          layout: 'vertical',
          x: 0,
          y: 100
        },
        series:
          Object.values((products.filter((value, index, array) => value.year === maxOfYears)).reduce((a, { name, feature1, feature2 }) => {
            if (!a[name]) a[name] = { name, data: [] };
            var point = [];
            point.push(feature1);
            point.push(feature2);
            a[name].data.push(point);
            return a
          }, {})),
      },
    };
  }

  updateYear(event) {
    this.updateSeries(parseInt(event.target.value), this.state.chartDisplayMode);
  }

  updateMode(event) {
    this.updateSeries(this.state.displayYear, event.target.value);
  }

  updateSeries = (year, mode) => {

    var filteredProducts = this.state.allProducts.filter((value, index, array) => value.year === year);

    if (mode === 'Goods') {

      var yearGroupedProducts = Object.values(filteredProducts.reduce((a, { name, feature1, feature2 }) => {
        if (!a[name]) a[name] = { name, data: [] };
        var point = [];
        point.push(feature1);
        point.push(feature2);
        a[name].data.push(point);
        return a;
      }, {}));

      this.setState({
        displayYear: year,
        chartDisplayMode: mode,
        chartOptions: {
          title: {
            text: mode
          },
          subtitle: {
            text: 'for ' + year
          },
          series: yearGroupedProducts
        }
      });
    } else {

      var s1 = {
        name: 'Товары, у которых значение feature1 больше 150',
        data: []
      };
      var s2 = {
        name: 'Товары, у которых значение feature1 меньше 100',
        data: []
      };
      var s3 = {
        name: 'Другие товары',
        data: []
      };

      filteredProducts.forEach(function (item) {
        var point = [];
        point.push(item.feature1);
        point.push(item.feature2);
        if (item.feature1 > 150) {
          s1.data.push(point)
        } else if (item.feature1 < 100) {
          s2.data.push(point)
        } else {
          s3.data.push(point)
        }
      });

      this.setState({
        displayYear: year,
        chartDisplayMode: mode,
        chartOptions: {
          title: {
            text: mode
          },
          subtitle: {
            text: 'for ' + year
          },
          series: [s1, s2, s3]
        }
      });
    }
  }

  render() {

    return (

      <div className='report'>
        <main>
          <h1>Report Page</h1>
          <HighchartsReact highcharts={Highcharts} options={this.state.chartOptions} />
          <label for='year'>Год:</label>
          <select id='year' value={this.state.displayYear} onChange={this.updateYear} id='year'>
            {this.state.years.map((option) => (
              <option value={option}> {option} </option>
            ))}
          </select>
          <label for='mode'>Режим отображения графика:</label>
          <select id='mode' value={this.state.chartDisplayMode} onChange={this.updateMode} id='mode'>
            <option value='Goods'>Goods</option>
            <option value='Goods category'>Goods category</option>
          </select>
        </main>
      </div>
    );
  }
}

export default Report;