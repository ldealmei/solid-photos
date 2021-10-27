import {
  getSolidDataset,
  getUrlAll,
  getThing,
} from "@inrupt/solid-client"

import {
  useSession,
  CombinedDataProvider,
  Image,
  Text,
} from "@inrupt/solid-ui-react"

import {
  Card,
  CardContent,
  Container,
} from "@material-ui/core"

import { VCARD } from "@inrupt/lit-generated-vocab-common"

import { useState, useEffect } from "react"

function getBaseUrl(iri) {
  if (!iri) return iri
  const url = new URL(iri)
  return url.origin + url.pathname
}


export default function Preview() {
  const [pics, setPics] = useState([])
  const { fetch, session } = useSession()
  const { webId } = session.info
  const webIdParts = webId.split("/profile")
  const rootUrl = webIdParts[0]

  const libraryUrl = rootUrl + "/solid-photos/v1/index.ttl#library"

  useEffect(() => {
    const runEffect = async () => {
      const dataset = await getSolidDataset(getBaseUrl(libraryUrl), { fetch })
      const library = getThing(dataset, libraryUrl)
      const pics = getUrlAll(library, VCARD.hasMember)
      setPics(pics)
    }
    runEffect()
  }, [])

  return (
    <Container fixed>
    {
      pics.map((picUrl, key) => {
        return (
          <CombinedDataProvider
            key={key}
            datasetUrl={rootUrl + "/solid-photos/v1/pics.ttl"}
            thingUrl={picUrl}>
              <Card style={{ maxWidth: 480 }}>
              <CardContent>
                <Text
                  property={"http://schema.org/name"}
                  edit={false}/>
                <Image property={"http://schema.org/url"} width={480} />
              </CardContent>
            </Card>
          </CombinedDataProvider>
        )
      })
    }

    </Container>
  )
}
