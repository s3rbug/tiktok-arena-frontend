import { Box, Flex, Avatar, HStack, Button } from "@chakra-ui/react"
import { Search } from "../../components"
import LogoSvg from "../../assets/logo.svg"
import { useNavigate } from "react-router-dom"

export function Header() {
	const navigate = useNavigate()
	function handleLogoClick() {
		navigate("/tournaments")
	}
	return (
		<>
			<Box px={4}>
				<Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
					<HStack spacing={8} alignItems={"center"}>
						<Box cursor={"pointer"}>
							<img src={LogoSvg} alt="logo" onClick={handleLogoClick} />
						</Box>
					</HStack>
					<HStack spacing={12} alignItems={"center"}>
						<Search />
						<Button variant={"link"} cursor={"pointer"} minW={0}>
							<Avatar
								size="md"
								src={
									"https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
								}
							/>
						</Button>
					</HStack>
				</Flex>
			</Box>
		</>
	)
}
