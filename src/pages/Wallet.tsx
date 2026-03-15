
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {Item, ItemActions, ItemGroup, ItemMedia} from "@/components/ui/item"
import { useLocation } from "react-router-dom"
import {Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle} from "@/components/ui/empty.tsx";
import {ArrowLeftIcon} from "lucide-react"



export default function Wallet() {
    const location = useLocation()
    const { customerBusiness } = location.state || {}

    console.log(customerBusiness, 'customerBusiness')

    if (!customerBusiness) {

        return (
            <div className="flex min-h-screen items-center justify-center px-4">
                <Empty className="w-full max-w-sm">
                    <EmptyHeader>
                        <EmptyMedia variant="icon">
                            <Button variant="outline" size="icon" aria-label="Go Back">
                                <ArrowLeftIcon />
                            </Button>
                        </EmptyMedia>
                        <EmptyTitle>¡Algo salió mal en la solicitud!</EmptyTitle>
                        <EmptyDescription>
                            Por favor intenta nuevamente
                        </EmptyDescription>
                    </EmptyHeader>
                </Empty>
            </div>
        ) }

    return (
        <div className="flex min-h-screen items-center justify-center px-4">
            <ItemGroup className="max-w-sm">
                <Item variant="outline">
                    <ItemMedia>
                        <Avatar>
                            <AvatarImage src="/google-wallet.png" />
                        </Avatar>
                    </ItemMedia>

                    <ItemActions>

                            <Button className="rounded-full" asChild>
                                <a href={customerBusiness.addToWalletUrl}>
                                    Add Google Wallet
                                </a>
                            </Button>

                    </ItemActions>
                </Item>
            </ItemGroup>
        </div>
    )}


