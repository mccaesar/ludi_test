import { Flex, Box } from '@chakra-ui/react';
import { useState } from 'react';
import { BsCaretRightFill } from 'react-icons/bs';
// import Select from 'react-select';
import Select from '../../components/Select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

export const NavMultiSelect = (props) => {
  const { active, subtle, icon, children, label, endElement } = props;
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    { value: 'AI/ML', label: 'AI/ML' },
    { value: 'audio', label: 'audio' },
    { value: 'BGP', label: 'BGP' },
    { value: 'C++', label: 'C++' },
    { value: 'C/C++', label: 'C/C++' },
    { value: 'conferences', label: 'conferences' },
    { value: 'creation', label: 'creation' },
    { value: 'deploy', label: 'deploy' },
    { value: 'develop', label: 'develop' },
    { value: 'devices', label: 'devices' },
    { value: 'fun', label: 'fun' },
    { value: 'hosting', label: 'hosting' },
    { value: 'IP', label: 'IP' },
    { value: 'Java', label: 'Java' },
    { value: 'labs', label: 'labs' },
    { value: 'Layer 2', label: 'Layer 2' },
    { value: 'lectures', label: 'lectures' },
    { value: 'lectures/talks', label: 'lectures/talks' },
    { value: 'lessons', label: 'lessons' },
    { value: 'meetings', label: 'meetings' },
    { value: 'OpenFlow', label: 'OpenFlow' },
    { value: 'OSPF', label: 'OSPF' },
    { value: 'P4', label: 'P4' },
    { value: 'Python', label: 'Python' },
    { value: 'readings', label: 'readings' },
    { value: 'routing', label: 'routing' },
    { value: 'SDN', label: 'SDN' },
    { value: 'security', label: 'security' },
    { value: 'social', label: 'social' },
    { value: 'TCP', label: 'TCP' },
    { value: 'test/evaluate', label: 'test/evaluate' },
    { value: 'tests', label: 'tests' },
    { value: 'traces/datasets', label: 'traces/datasets' },
    { value: 'video', label: 'video' },
    { value: 'virtualization', label: 'virtualization' },
    { value: 'VR/AR/3D', label: 'VR/AR/3D' },
    { value: 'wireless', label: 'wireless' },
  ];

  const customStyles = {
    control: (styles) => ({ ...styles, backgroundColor: 'white' }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => ({
      ...styles,
      color: 'black',
    }),
  };

  return (
    <Select
      closeMenuOnSelect={false}
      components={animatedComponents}
      isMulti
      options={options}
      styles={customStyles}
    />
  );
};
