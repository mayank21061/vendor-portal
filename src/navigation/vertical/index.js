const navigation = () => {
  return [
    {
      title: 'Dashboard',
      path: '/dashboard',
      icon: 'tabler:smart-home'
    },
    {
      title: 'Inbox',
      path: '/inbox',
      icon: 'tabler:mail'
    },
    {
      path: '/poSummary',
      title: 'PO Summary',
      icon: 'tabler:shield'
    },
    {
      path: '/vendors',
      title: 'Vendors',
      icon: 'tabler:user-check'
    },
    {
      path: '/clients',
      title: 'Clients',
      icon: 'tabler:user'
    }
  ]
}

export default navigation
