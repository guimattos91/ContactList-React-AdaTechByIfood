import { FC } from 'react'
import { RiContactsBookLine } from 'react-icons/ri'

interface IContactCardProps {}

const EmptyComponent: FC<IContactCardProps> = () => {
  return (
    <div className="flex flex-col items-center">
      <RiContactsBookLine className="h-20 w-20 text-muted-foreground" />

      <span className="mt-4 text-center font-bold text-muted-foreground">
        Você ainda não tem contatos cadastrados.
      </span>
      <span className="text-center text-sm text-muted-foreground">
        Adicione contatos para manter sua lista organizada.
      </span>
    </div>
  )
}

export { EmptyComponent }
