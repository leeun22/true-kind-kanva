interface CheckboxProps {
  id?: string
  children: React.ReactNode
  checked?: boolean
  onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Checkbox({ id, children, checked, onChange }: CheckboxProps) {
  return (
    <label className="checkbox flex items-center gap-[8px] cursor-pointer select-none">
      <input
        type="checkbox"
        id={id}
        className="appearance-none w-[16px] h-[16px] bg-[#fff] border-[1.5px] border-solid border-[#d9d9d9] rounded-[4px] relative flex items-center justify-center flex-shrink-0 hover:border-[#3b3b3b] cursor-pointer after:content-[''] after:absolute after:top-[1px] after:left-[5px] after:w-[5px] after:h-[10px] after:border-r-[1.8px] after:border-b-[1.8px] after:border-solid after:border-[#3b3b3b] checked:border-[#3b3b3b] after:origin-center after:rotate-45 after:scale-0 after:opacity-0 checked:after:scale-100 checked:after:opacity-100 after:transition-all after:duration-150 after:ease-in-out"
        style={{
          transition: 'border-color 0.2s ease'
        }}
        checked={checked}
        onChange={onChange}
      />

      {children}
    </label>
  )
}
