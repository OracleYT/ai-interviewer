export const extractFileName = (() => {
  const cache: Record<string, string | undefined> = {};

  return (url: string) => {
    if (cache[url]) {
      return cache[url];
    }

    const fileName = url?.split("/")?.pop();
    const processedFileName = fileName?.split("-")?.slice(1).join("-");
    cache[url] = processedFileName;

    return processedFileName;
  };
})();

export const buildFileLinkMap = (docs: any, view_size = 20) => {
  return (
    docs?.reduce((acc: any, doc: any) => {
      acc[doc.name] = {
        url: doc.url,
        file_name: extractFileName(doc.url),
      };
      if (acc[doc.name]?.file_name?.length > view_size) {
        acc[doc.name].view_file_name =
          acc[doc.name]?.file_name?.substring(0, view_size) + "...";
      } else {
        acc[doc.name].view_file_name = acc[doc.name]?.file_name;
      }
      return acc;
    }, {}) || {}
  );
};
