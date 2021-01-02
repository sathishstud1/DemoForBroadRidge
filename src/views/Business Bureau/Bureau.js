import React, { Component } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import GaugeChart from "react-gauge-chart";
import "./Bureau.scss";
import jsonSchemaGenerator from "json-schema-generator";
import JSONSchemaForm from "@rjsf/core";
import JSONTree from "react-json-tree";
import axios from "../../axios-instance";
import {withRouter} from 'react-router';
import ParseBureauJson from './ParseBureauJson';


class Bureau extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      loading: true,
      commericalScore:0
    };
    this.tin = "800914632";
    this.id = "200030";
    this.getJson();
  }

  async getJson() {
    if(this.props.tin){
      this.tin = this.props.tin;
      this.id = this.props.id;
    }
    let postData = {
      tin: this.tin,
      "id": this.id
    };
    return axios
      .post("/pullExperianBusBureau", postData)
      .then((response) => {
        if(response.data.status){
          this.json = JSON.parse(response.data.data);
          let commericalScore = this.json.results.scoreInformation.commercialScore.score;
          this.setState({ loading: false, commericalScore:commericalScore });
        }else{
          this.props.history.push({
            pathname: "/error",
            errorObj: response.data.message,
            curr_loc: this.props.location.pathname,
          });
        }        
      })
      .catch((error) => {
        console.log(error);
        this.props.history.push({
          pathname: "/error",
          errorObj: error,
          curr_loc: this.props.location.pathname,
        });
      });
  }

  updateStyles() {
    if(!document.getElementById("json-report-view")){
      return;
    }
    Array.from(
      document.getElementById("json-report-view").getElementsByTagName("ul")
    ).forEach((d) => {
      d.classList.add("list-group");
      d.classList.add("m-3");
    });

    Array.from(
      document.getElementById("json-report-view").getElementsByTagName("li")
    ).forEach((d) => {
      d.classList.add("list-group-item");
      d.classList.add("bureau-item");
      d.classList.add("mt-1");
    });

    Array.from(
      document.getElementById("json-report-view").getElementsByTagName("span")
    ).forEach((d) => {
      // console.log(d.innerText);
    });

    Array.from(
      document.getElementById("json-report-view").getElementsByTagName("label")
    ).forEach((d) => {
      d.innerText = d.innerText
        .replace(/([A-Z]+)/g, " $1")
        .replace(/([A-Z][a-z])/g, " $1");
    });

    Array.from(document.querySelectorAll(".bureau-item > div")).forEach((d) => {
      if (!d.classList.contains("open")) {
        d.click();
        d.classList.add("open");
      }
    });

    Array.from(document.querySelectorAll(".bureau-item > span"))
      .filter((d) => d.innerText.includes("key"))
      .forEach((d) => d.classList.add("d-none"));
    Array.from(document.querySelectorAll(".bureau-item > span"))
      .filter(
        (d) => d.innerText.includes("null") || d.innerText.includes("undefined")
      )
      .forEach((d) => d.parentElement.classList.add("d-none"));
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="white-overlay">
          <span>Loading....</span>
        </div>
      );
    }

    const Form = JSONSchemaForm;
    const formSchema = jsonSchemaGenerator(this.json);
    //setTimeout(this.updateStyles, 0);
    let commercial_score  = this.state.commericalScore;
    let scorePercentage = this.state.commericalScore;
    if(scorePercentage!=0){
      scorePercentage = scorePercentage/100;
    }
    let bureauclassName = "ml-5 mt-2 text-danger";
    let scoreText = "Poor";
    if(commercial_score<=20){
      scoreText = "Poor";
      bureauclassName = "ml-5 mt-2 text-danger";
    }else if(commercial_score>20 && commercial_score<=40){
      scoreText = "Average";
      bureauclassName = "ml-5 mt-2 text-danger";
    }else if(commercial_score>40 && commercial_score<=60){
      scoreText = "Good";
      bureauclassName = "ml-5 mt-2 text-primary";
    }else if(commercial_score>60 && commercial_score<=80){
      scoreText = "Very Good";
      bureauclassName = "ml-5 mt-2 text-success";
    }else if(commercial_score>80 && commercial_score<=100){
      scoreText = "Excellent";
      bureauclassName = "ml-5 mt-2 text-success";
    }

    return (
      <div className="animated fadeIn bureau">
        <Row>
          <Col lg={6}>
            <Card>
              <CardBody className="card-body">
                <div className="row">
                  <div className="col-6">
                    <GaugeChart
                      id="gauge-chart5"
                      nrOfLevels={420}
                      arcsLength={[0.2, 0.2, 0.2, 0.2, 0.2]}
                      colors={[
                        "#EA4228",
                        "#F5CD19",
                        "#5BE12C",
                        "#EA4228",
                        "#F5CD19",
                        "#5BE12C",
                      ]}
                      percent={scorePercentage}
                      arcPadding={0.02}
                    />
                  </div>

                  <div className="col-6">
                    <h6 className="ml-5 mt-5 text-success">Commercial Score</h6>
                    <h1 className="ml-5 mt-2 text-primary">{this.state.commericalScore}</h1>
                    <h5 className={bureauclassName}>{scoreText}</h5>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg={6}>
            <Card>
              <CardBody className="card-body">
                <div className="row">
                  <div className="col-6">
                    <GaugeChart
                      id="gauge-chart6"
                      nrOfLevels={20}
                      colors={[
                        "#EA4228",
                        "#F5CD19",
                        "#5BE12C",
                        "#EA4228",
                        "#F5CD19",
                        "#5BE12C",
                      ]}
                      percent={scorePercentage}
                    />
                  </div>

                  <div className="col-6">
                    <h6 className="ml-5 mt-5 text-success">Commercial Score</h6>
                    <h1 className="ml-5 mt-2 text-primary">{this.state.commericalScore}</h1>
                    <h5 className={bureauclassName}>{scoreText}</h5>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col lg={12}>
            <Card>
              <CardBody className="card-body" style={{ overflow: "auto" }}>
                <div
                  className="json-report-view"
                  id="json-report-view"
                  onClick={() => this.updateStyles()}
                >
                  <JSONTree hideRoot={true} data={this.json} />
                </div>
                {/*<ParseBureauJson json={this.json}/>*/}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withRouter(Bureau);
