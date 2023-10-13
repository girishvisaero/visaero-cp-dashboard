import {
  Box,
  Modal,
  Paper,
  ScrollArea,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCircleChevronRight } from "@tabler/icons-react";

const OfferCard = ({ isSelected, setIsSelected, index, data }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const theme = useMantineTheme();
  const isActive = index === isSelected;

  const is_insurance = !!data?.is_visaero_insurance_bundled;

  let visaDetails = data?.visa_details;
  let insuranceDetails = data?.insurance_details;
  let offerType = data?.visa_type;
  let title = `${visaDetails?.duration_display} ${
    offerType === "evisa" ? "e-Visa" : ""
  } ${is_insurance ? "+ Insurance" : ""}`.trim();

  const insuranceItem = (obj, i) => (
    <Text color="dimmed" mb=".3rem" key={i}>
      {obj?.name}: {obj?.value}{" "}
    </Text>
  );

  const insuranceRibin = is_insurance && (
    <Box
      bg={theme.primaryColor}
      px={"sm"}
      sx={{
        width: "40%",
        position: "relative",
        color: "#fff",
        fontSize: "0.7rem",
        fontWeight: 400,
        bottom: 7.5,
        "&:before": {
          content: `""`,
          background: theme.colors[theme.primaryColor][0],
          position: "absolute",
          width: "15px",
          height: "100%",
          top: "0",
          right: "-13px",
          zIndex: 99,
          clipPath: "polygon(0% 0%, 100% 0, 25% 50%, 100% 100%, 0% 100%)",
        },
      }}
    >
      {insuranceDetails?.insurance_title}
    </Box>
  );

  return (
    <>
      <Paper
        withBorder={!isActive}
        radius="sm"
        h="100%"
        sx={{
          transition: "all 0.15s ease-in-out",
          position: "relative",
          overflow: "hidden",
          ...(isActive && {
            border: `1px solid ${theme.colors[theme.primaryColor][0]}`,
            boxShadow: `${
              theme.colors[theme.primaryColor][0]
            } 0px 2.26371px 15px`,
          }),
        }}
        onClick={() => setIsSelected(index)}
      >
        <Box bg={theme.colors[theme.primaryColor][0] + "40"} fw={500} fz="sm">
          <Box p="sm">
            <Box
              sx={{ display: "flex", justifyContent: "space-between", gap: 15 }}
            >
              <Box>{visaDetails?.duration_display} </Box>
              <Box>
                {visaDetails?.fees?.currency}{" "}
                {visaDetails?.fees?.adult_govt_fee}
              </Box>
            </Box>
          </Box>
          {insuranceRibin}
        </Box>
        <Box p="sm" fz={".7rem"} mb="45px">
          <Text color="dimmed" mb=".3rem">
            Visa Validity: {visaDetails?.visa_validity}
          </Text>
          <Text color="dimmed" mb=".3rem">
            Stay Validity: {visaDetails?.stay_validity}
          </Text>
          <Text color="dimmed" mb=".3rem">
            Processing Time: {visaDetails?.processing_time}
          </Text>
          {is_insurance &&
            insuranceDetails?.insurance_coverage.map(insuranceItem)}
        </Box>
        <Box
          bg={theme.primaryColor}
          fz="sm"
          sx={{
            position: "absolute",
            bottom: 0,
            color: "#fff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
          p="sm"
        >
          <Box
            sx={{ textDecoration: "underline", cursor: "pointer" }}
            onClick={open}
          >
            More Details
          </Box>
          <IconCircleChevronRight height={20} width={20} />
        </Box>
      </Paper>
      <Modal
        opened={opened}
        scrollAreaComponent={ScrollArea.Autosize}
        onClose={close}
        title={title}
      >
        <Box>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus
          nihil quisquam laborum? Ad repellendus eaque id cumque repudiandae
          quod excepturi dolorem, sequi perspiciatis labore, soluta doloremque
          magni velit beatae placeat!
        </Box>
        {/* Modal content */}
      </Modal>
    </>
  );
};

export default OfferCard;
