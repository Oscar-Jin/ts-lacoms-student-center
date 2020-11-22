import React from "react";
import moment from "moment";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { DaysOfWeek, LessonName } from "../../draft/Timetable";
import { useSelector } from "react-redux";

const TimeTableView = props => {
  const { monthSelect } = props;
  if (monthSelect === undefined) {
    throw new Error("props must be provided");
  }

  const targetMonth =
    monthSelect === "thisMonth"
      ? moment("2020-07-15").date(1).format("YYYY-MM-DD")
      : moment("2020-07-15").add(1, "month").date(1).format("YYYY-MM-DD");

  const allTimetables = useSelector(state => state.timetables);
  const timetable = allTimetables.find(T => T.iso8601 === targetMonth) || {};

  const daysOfWeek = Object.keys(DaysOfWeek);
  const titles = [
    "月曜日",
    "火曜日",
    "水曜日",
    "木曜日",
    "金曜日",
    "土曜日",
    "日曜日",
  ];
  // const englishTitles = [
  //   "Monday",
  //   "Tuesday",
  //   "Wednesday",
  //   "Thursday",
  //   "Friday",
  //   "Saturday",
  //   "Sunday",
  // ];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
        marginBottom: "1rem",
      }}
    >
      <br />
      <Row>
        <Col className="shadow-sm bg-white p-3 shadow">
          <h5
            className="mb-3 p-2 pl-3"
            style={
              monthSelect === "thisMonth"
                ? { borderLeft: "3px solid dodgerblue" }
                : { borderLeft: "3px solid #7fdb2e" }
            }
          >
            {monthSelect === "thisMonth"
              ? moment("2020-07-15").month() + 1
              : moment("2020-07-15").add(1, "month").month() + 1}
            月時間割：
          </h5>
          <Tabs defaultActiveKey="monday">
            {daysOfWeek.map((dayOfWeek, index) => {
              let timeStrings = ["XX:XX"];
              return (
                <Tab eventKey={dayOfWeek} title={titles[index]} key={dayOfWeek}>
                  <Table responsive size="sm" className="mt-3">
                    {/* <caption>{englishTitles[index]}</caption> */}
                    <tbody style={{ border: "none" }} className="text-muted">
                      {timetable[dayOfWeek] &&
                        timetable[dayOfWeek].map((schedule, i) => {
                          const {
                            timeString,
                            lessonName,
                            instructorName,
                            regularsOnly,
                            id,
                          } = schedule;
                          const isSame = timeString === timeStrings[i];
                          timeStrings.push(timeString);
                          return (
                            <tr key={id}>
                              <td
                                style={
                                  isSame
                                    ? { border: "none" }
                                    : {
                                        borderTop: "1px dashed lightgray",
                                        color: "#404040",
                                      }
                                }
                              >
                                {isSame ? "" : timeString}
                              </td>
                              <td
                                className={"td-" + checkLessonType(lessonName)}
                                style={
                                  isSame
                                    ? { border: "none" }
                                    : { borderTop: "1px dashed lightgray" }
                                }
                              >
                                {lessonName}
                              </td>
                              <td
                                style={
                                  isSame
                                    ? { border: "none" }
                                    : { borderTop: "1px dashed lightgray" }
                                }
                              >
                                {instructorName}
                              </td>
                              <td
                                style={
                                  isSame
                                    ? { border: "none" }
                                    : { borderTop: "1px dashed lightgray" }
                                }
                              >
                                {regularsOnly ? "(レギュラー限定)" : ""}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </Table>
                </Tab>
              );
            })}
          </Tabs>
        </Col>
      </Row>
    </div>
  );
};

export default TimeTableView;

export const checkLessonType = lessonName => {
  switch (lessonName) {
    case LessonName.A:
    case LessonName.B:
    case LessonName.C:
    case LessonName.D:
    case LessonName.E:
    case LessonName.F:
    case LessonName.GHI:
    case LessonName.ONLINE:
    case LessonName.ONLINE_E:
    case LessonName.ONLINE_F:
    case LessonName.ONLINE_GHI:
      return "GV";
    case LessonName.L1:
    case LessonName.L2:
    case LessonName.L3:
    case LessonName.L4:
    case LessonName.L5:
    case LessonName.ONLINE_L1:
      return "LSP";
    default:
      return "";
  }
};
