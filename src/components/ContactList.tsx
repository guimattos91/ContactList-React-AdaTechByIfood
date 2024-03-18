import { useMemo } from 'react'
import { Separator } from '@/components/ui/separator'
import { EmptyComponent } from './EmptyContact'
import { ContactCard } from './ContactCard'
import { getAllContacts } from '@/api/contact/getAllContacts'
import { useQuery } from '@tanstack/react-query'

const ContactList = () => {
  const { data: contacts, isLoading: isLoadingContacts } = useQuery({
    queryKey: ['contacts'],
    queryFn: getAllContacts,
    staleTime: Infinity,
  })

  const contactsSize = useMemo(() => contacts?.length ?? 0, [contacts])
  console.log(contacts)

  return (
    <>
      <div className="mx-auto my-4 w-10/12">
        <div className="relative mt-12 flex items-center gap-4 text-lg font-semibold text-primary sm:text-xl">
          Contatos
          <span className="rounded-full bg-secondary px-2 text-sm text-muted-foreground sm:text-lg">
            {contactsSize}
          </span>
        </div>
        <Separator className="mb-8 mt-4 bg-border" />
        <div className="my-4 flex flex-col justify-center gap-2">
          {isLoadingContacts ? (
            <p>Carregando contatos...</p>
          ) : contactsSize < 1 ? (
            <EmptyComponent />
          ) : (
            contacts &&
            contacts.map((contact) =>
              contact && contact.id ? (
                <ContactCard key={contact.id} {...contact} />
              ) : null,
            )
          )}
        </div>
      </div>
    </>
  )
}

export { ContactList }
