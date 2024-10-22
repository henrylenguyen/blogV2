import repositoryAPI from '@/api/repositories'
import Loader from '@/components/layouts/loading'
import { Table } from '@/components/layouts/table'
import { columnsSiteCollections } from '@/page/repositories/list-repositories/columModel'
import { useQuery } from '@tanstack/react-query'

const ListRepositoryPage = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['siteCollections'],
    queryFn: () => {
      return repositoryAPI.getAllSiteCollection()
    }
  })

  return isLoading ? <Loader /> : <Table isShowNumberPerPage columns={columnsSiteCollections} data={data} />
}

export default ListRepositoryPage
