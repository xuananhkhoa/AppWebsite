import { Stat as ChakraStat, StatLabel, StatNumber, StatHelpText, StatArrow } from '@chakra-ui/react';

const CustomStat = ({ label, number, helpText, arrowType, showArrow = true }) => {
  return (
    <ChakraStat>
      <StatLabel>{label}</StatLabel>
      <StatNumber>{number}</StatNumber>
      <StatHelpText>
        {showArrow && <StatArrow type={arrowType || 0} />}
        {helpText}
      </StatHelpText>
    </ChakraStat>
  );
};

export default CustomStat;
