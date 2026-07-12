import AcademicYears from "./Componnents/AcademicYears";

import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import AddNewYears from "./Componnents/AddNewYears";
import { getschoolyears  } from "../../../services/setting/currentyears.service";

export default function GeneralSettings() {
    const [schoolYears, setSchoolYears] = React.useState([]);
    const id = React.useId();
    // return (
    //     <>
    //        <AcademicYears/>
    //     </>
    // );

    const loadSchoolYears = async () => {
        try {
            const data = await getschoolyears();

            const years = Array.isArray(data?.data)
                ? data.data
                : Array.isArray(data)
                  ? data
                  : [];

            setSchoolYears(years);
        } catch (error) {
            console.error(error);
        }
    };

    React.useEffect(() => {
        loadSchoolYears();
    }, []);
    return (
        <div>
            <Accordion defaultExpanded>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`${id}-panel1-content`}
                    id={`${id}-panel1-header`}
                >
                    <Typography component="span">School Years</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {/* <AddNewYears  />
                    <AddNewYears setSchoolYears={setSchoolYears} />
                    <AcademicYears schoolYears={schoolYears} setSchoolYears={setSchoolYears} /> */}

                    <AddNewYears refreshSchoolYears={loadSchoolYears} />

                    <AcademicYears
                        schoolYears={schoolYears}
                        setSchoolYears={setSchoolYears}
                    />
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`${id}-panel2-content`}
                    id={`${id}-panel2-header`}
                >
                    <Typography component="span">Accordion 2</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse malesuada lacus ex, sit amet blandit leo
                    lobortis eget.
                </AccordionDetails>
            </Accordion>
        </div>
    );
}
