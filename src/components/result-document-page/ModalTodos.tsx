import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import {
    Avatar,
    Box,
    Button,
    HStack,
    Input,
    Menu,
    MenuButton,
    MenuGroup,
    MenuItem,
    MenuList,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Radio,
    RadioGroup,
    Stack,
    Text,
    useRadioGroup,
    VStack,
} from "@chakra-ui/react";
import CustomRadio from "components/CustomRadio";
import { updateUserStories } from "lib/api/userStories";
import useGetAllUsers from "lib/hooks/useGetAllUsers";
import useUserStoriesOfSelection from "lib/hooks/useUserStoriesOfSelection";
import { useRouter } from "next/router";
import React, { useState } from "react";
import useUserStoriesStore from "stores/useUserStoriesStore";

type todo = {
    id?: number;
    status?: string;
    selectionId?: number;
    content?: string;
};
const type = ["IN", "IN_PROGRESS", "IN_REVIEW", "DONE"];
const userStoryStatus = {
    IN: "TODO",
    IN_PROGRESS: "IN PROGRESS",
    IN_REVIEW: "IN REVIEW",
    DONE: "DONE",
};
function ModalTodo({ isOpen, setIsOpen, itemSelected, setItemSelected }: any) {
    const { users, isLoading: usersLoading } = useGetAllUsers();
    // const users = [
    //     {
    //         name: "admin",
    //     },
    //     {
    //         name: "123",
    //     },
    // ];
    const router = useRouter();
    const documentId = Number(router.query.documentId);
    const [loadingSubmit, setLoadingSubmit] = useState(false);

    const { mutate } = useUserStoriesOfSelection(documentId);

    const { userStories, setUserStories } = useUserStoriesStore();
    const [item, setItem] = useState<string>();
    const onClose = () => {
        setIsOpen(false);
    };
    // console.log("userStories:", userStories);
    console.log("users : ", users);
    const onSave = () => {
        setLoadingSubmit(true);
        const updatedFetchData = userStories.map((data: todo) => {
            if (data.id === itemSelected.id) {
                return { ...data, status: item }; // tạo ra một item mới với type mới
            } else {
                return data; // không phải item cần thay đổi, trả về item cũ
            }
        });
        // console.log("updatedFetchData : ", updatedFetchData);
        setUserStories(updatedFetchData);
        updateUserStories(itemSelected.selectionId, itemSelected.id, item).then(
            (res) => {
                console.log("res", res);
                mutate();
                setLoadingSubmit(false);
                setIsOpen(false);
                setItem(undefined);
            }
        );
    };
    const list = ["All", "Comments", "History"];
    const { getRootProps, getRadioProps } = useRadioGroup({
        name: "test",
        defaultValue: "Comments",
        onChange: console.log,
    });
    const group = getRootProps();

    const finalRef = React.useRef(null);

    return (
        <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent p={8} minW="80vw" minH="70vh">
                {/* <ModalHeader>Edit user story</ModalHeader> */}
                <ModalCloseButton />
                <ModalBody>
                    <Stack flexDir="row" gap={10}>
                        <Stack flex={2} gap={10} flexDir="column">
                            <Text fontWeight="bold" fontSize="18px">
                                {itemSelected?.title}
                            </Text>
                            <VStack gap={2} alignItems="flex-start">
                                <Text fontSize="18px" fontWeight="bold">
                                    Description:{" "}
                                </Text>
                                <Input
                                    variant="flushed"
                                    placeholder="Add a description..."
                                />
                            </VStack>
                            <HStack>
                                <Text>Show: </Text>
                                {list.map((item) => (
                                    <CustomRadio
                                        key={item}
                                        {...getRadioProps({ value: item })}
                                    >
                                        {item}
                                    </CustomRadio>
                                ))}
                            </HStack>
                            <HStack>
                                <Avatar></Avatar>
                                <Input
                                    variant="outline"
                                    placeholder="Add a comment..."
                                />
                            </HStack>
                        </Stack>
                        <Stack gap={14} flex={1}>
                            <Menu>
                                <MenuButton
                                    w="180px"
                                    as={Button}
                                    cursor="pointer"
                                >
                                    <HStack justifyContent="center">
                                        <Text>
                                            {item === undefined
                                                ? userStoryStatus[
                                                      itemSelected?.status
                                                  ]
                                                : userStoryStatus[item]}
                                        </Text>
                                        <ChevronDownIcon />
                                    </HStack>
                                </MenuButton>
                                <MenuList>
                                    <MenuGroup>
                                        {type.map((item: string) => {
                                            if (item !== itemSelected?.status) {
                                                return (
                                                    <MenuItem
                                                        onClick={() => {
                                                            setItem(item);
                                                            console.log(
                                                                "userStoryStatus[item] : ",
                                                                userStoryStatus[
                                                                    item
                                                                ]
                                                            );
                                                        }}
                                                        key={item}
                                                    >
                                                        {userStoryStatus[item]}
                                                    </MenuItem>
                                                );
                                            }
                                        })}
                                        {/* <MenuItem>TODO</MenuItem>
                                        <MenuItem>TODO</MenuItem>
                                        <MenuItem>TODO</MenuItem> */}
                                        {/* <RadioGroup
                                            mt={6}
                                            defaultValue={itemSelected?.status}
                                        >
                                            <Stack
                                                spacing={[1, 2]}
                                                direction={"column"}
                                            >
                                                <Radio
                                                    onChange={(value: any) =>
                                                        setItem(
                                                            value.target.value
                                                        )
                                                    }
                                                    value="IN"
                                                >
                                                    TODO
                                                </Radio>
                                                <Radio
                                                    onChange={(value: any) => {
                                                        setItem(
                                                            value.target.value
                                                        );
                                                    }}
                                                    value="IN_PROGRESS"
                                                >
                                                    IN_PROGRESS
                                                </Radio>
                                                <Radio
                                                    onChange={(value: any) =>
                                                        setItem(
                                                            value.target.value
                                                        )
                                                    }
                                                    value="IN_REVIEW"
                                                >
                                                    INPREVIEW
                                                </Radio>
                                                <Radio
                                                    onChange={(value: any) =>
                                                        setItem(
                                                            value.target.value
                                                        )
                                                    }
                                                    value="DONE"
                                                >
                                                    DONE
                                                </Radio>
                                            </Stack>
                                        </RadioGroup> */}
                                    </MenuGroup>
                                </MenuList>
                            </Menu>

                            <Stack>
                                <Stack
                                    p={4}
                                    w="full"
                                    justifyContent="space-between"
                                    flexDir="row"
                                    borderWidth="1px 1px 0px 1px"
                                    borderColor="gray.300"
                                >
                                    <Text fontWeight="bold">Details</Text>
                                    <ChevronUpIcon />
                                </Stack>
                                <Stack
                                    h="100%"
                                    mt="0px !important"
                                    p={4}
                                    gap={4}
                                    borderWidth="1px 1px 1px 1px"
                                    borderColor="gray.300"
                                >
                                    <HStack justifyContent="space-between">
                                        <Text>Assignee</Text>
                                        <Menu>
                                            <MenuButton>
                                                <Avatar name="admin" />
                                            </MenuButton>
                                            <MenuList>
                                                {!usersLoading &&
                                                    users.map((user) => (
                                                        <MenuItem
                                                            key={user.name}
                                                        >
                                                            <Avatar
                                                                name={user.name}
                                                            />
                                                        </MenuItem>
                                                    ))}
                                            </MenuList>
                                        </Menu>
                                    </HStack>
                                    <HStack justifyContent="space-between">
                                        <Text>Reporter</Text>
                                        <Avatar />
                                    </HStack>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Stack>
                </ModalBody>

                <ModalFooter>
                    <Button size="md" onClick={onClose} variant="ghost">
                        Close
                    </Button>
                    {loadingSubmit ? (
                        <Button
                            isLoading
                            loadingText="Saving"
                            colorScheme="blue"
                            variant="outline"
                        >
                            Saving
                        </Button>
                    ) : (
                        <Button
                            size="md"
                            onClick={onSave}
                            colorScheme="blue"
                            mr={3}
                        >
                            Save the change
                        </Button>
                    )}
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
export default ModalTodo;
