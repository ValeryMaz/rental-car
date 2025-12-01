import { getCars } from "../lib/api";

import CatalogWrapper from "../components/CatalogWrapper/CatalogWrapper";

const Catalog = async () => {
  const data = await getCars();
  //   console.log(data);
  return (
    <section>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}

      {data?.cars?.length > 0 && (
        <CatalogWrapper
          initialCars={data.cars}
          initialPage={data.page}
          initialTotalPages={data.totalPages}
        />
      )}
    </section>
  );
};

export default Catalog;
