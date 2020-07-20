import React from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { DaysOfWeek, LessonName } from "../../draft/Timetable";

const TimeTableView = props => {
  const { timetable = {} } = props;
  if (timetable === undefined) {
    throw new Error("props must be provided");
  }

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
  const englishTitles = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <div>
      <h5 className="mb-3">7月の時間割：</h5>
      <Row xs={1} lg={2}>
        <Col>
          <Tabs defaultActiveKey="monday" transition={false} variant="pills">
            {daysOfWeek.map((dayOfWeek, index) => {
              let timeStrings = ["XX:XX"];
              return (
                <Tab eventKey={dayOfWeek} title={titles[index]} key={dayOfWeek}>
                  <Table striped responsive size="sm" className="mt-3">
                    <caption>{englishTitles[index]}</caption>
                    <tbody>
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
                              <td>{isSame ? "" : timeString}</td>
                              <td
                                className={"td-" + checkLessonType(lessonName)}
                              >
                                {lessonName}
                              </td>
                              <td>{instructorName}</td>
                              <td>{regularsOnly ? "(レギュラー限定)" : ""}</td>
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
