import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'

export default function Home() {
	return (
		<div>
			<Button>Click me</Button>
			<Dialog>
				<DialogTrigger>Open</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Are you sure absolutely sure?</DialogTitle>
						<DialogDescription>
							This action cannot be undone. This will permanently delete your
							account and remove your data from our servers.
						</DialogDescription>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</div>
	)
}
