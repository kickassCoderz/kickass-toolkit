import { createFromDataProvider, IDataService } from '@kickass-coderz/data-service'
import { createClient, SupabaseClientOptions } from '@supabase/supabase-js'
import { ResourcesOptions, supabaseDataProvider } from 'ra-supabase'

function SupabaseDataService(
    resources: ResourcesOptions,
    url: string,
    supabaseKey: string,
    options?: SupabaseClientOptions<string> | undefined
): IDataService {
    const supabase = createClient(url, supabaseKey, options)

    // @ts-expect-error Argument of type 'SupabaseClient<any, string, any>' is not assignable to parameter of type 'SupabaseClient'.
    const dataProvider = supabaseDataProvider(supabase, resources)
    const dataService = createFromDataProvider(dataProvider)

    return dataService
}

export { SupabaseDataService }
