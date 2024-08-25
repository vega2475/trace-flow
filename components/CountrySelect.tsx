import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { Control, FieldPath } from 'react-hook-form'
import { z } from 'zod'
import {
	FormField,
	FormLabel,
	FormControl,
	FormMessage,
} from '@/components/ui/form'
import { authFormSchema, cn } from '@/lib/utils'
import countries from '../public/countries.json' // Импорт данных о странах

interface CountrySelect {
	control: Control<z.infer<typeof authFormSchema>>
	name: FieldPath<z.infer<typeof authFormSchema>>
	label: string
	placeholder: string
}

const CountrySelect = ({
	control,
	name,
	label,
	placeholder,
}: CountrySelect) => {
	const [open, setOpen] = React.useState(false)

	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<div className='form-item'>
					<FormLabel className='form-label'>{label}</FormLabel>
					<FormControl>
						<Popover open={open} onOpenChange={setOpen}>
							<PopoverTrigger asChild>
								<Button
									variant='outline'
									role='combobox'
									aria-expanded={open}
									className={cn(
										'input-class', // Общие стили для input и button
										'w-full justify-between'
									)}
								>
									{field.value
										? countries.find(
												(country) => country.country === field.value
										  )?.country
										: placeholder}
									<ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
								</Button>
							</PopoverTrigger>
							<PopoverContent
								align='start' // Выравнивание по началу кнопки
								className='w-full p-0 bg-white border border-gray-300 rounded-md shadow-md'
							>
								<Command>
									<CommandInput
										placeholder='Search country...'
										className='p-2 border-b'
									/>
									<CommandList className='max-h-60 overflow-y-auto'>
										<CommandEmpty className='p-2 text-center text-gray-500'>
											No country found.
										</CommandEmpty>
										<CommandGroup>
											{countries.map((country) => (
												<CommandItem
													key={country.abbreviation}
													value={country.country}
													onSelect={(currentValue) => {
														field.onChange(currentValue)
														setOpen(false)
													}}
													className='p-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between'
												>
													{country.country}
													<Check
														className={cn(
															'mr-2 h-4 w-4',
															field.value === country.abbreviation
																? 'opacity-100 text-blue-500'
																: 'opacity-0'
														)}
													/>
												</CommandItem>
											))}
										</CommandGroup>
									</CommandList>
								</Command>
							</PopoverContent>
						</Popover>
					</FormControl>
					<FormMessage className='form-message mt-2' />
				</div>
			)}
		/>
	)
}

export default CountrySelect
