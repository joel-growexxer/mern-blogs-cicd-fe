import { Card, CardHeader, CardBody } from "@heroui/card";
import { Image } from "@heroui/image";
import { Skeleton } from "@heroui/skeleton";
import { useNavigate } from "react-router-dom";

export const BlogCard = ({
  id,
  author,
  title,
  category,
  tags,
  image,
}: {
  id: string;
  author: string;
  title: string;
  category: string;
  tags: string[];
  image: string;
}) => {
  const navigate = useNavigate();

  const handlePress = () => {
    navigate(`/${id}`);
  };

  return (
    <Card isPressable className="p-4 cursor-pointer" onPress={handlePress}>
      <CardBody className="overflow-visible h-[300px] p-0">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          height={300}
          src={image}
          width={300}
        />
      </CardBody>
      <CardHeader className="w-[300px] pb-0 pt-4 px-0 flex-col items-start">
        <h4 className="font-bold text-xl mb-2 text-left">{title}</h4>
        <p className="text-small uppercase font-bold">{category}</p>
        <small className="w-[300px] text-default-500 mb-2 truncate text-ellipsis text-left">
          {tags.join(", ")}
        </small>
        <h3 className="text-md">{author}</h3>
      </CardHeader>
    </Card>
  );
};

export const BlogCardSkeleton = () => {
  return (
    <Card className="space-y-5 p-4" radius="lg">
      <Skeleton className="rounded-lg">
        <div className="h-[300px] w-[300px] rounded-lg bg-default-300" />
      </Skeleton>
      <div className="space-y-3">
        <Skeleton className="h-5 w-3/5 rounded-lg">
          <div className="h-3 w-3/5 rounded-lg bg-default-200" />
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-3 w-4/5 rounded-lg bg-default-200" />
        </Skeleton>
        <Skeleton className="w-2/5 rounded-lg">
          <div className="h-3 w-2/5 rounded-lg bg-default-300" />
        </Skeleton>
      </div>
    </Card>
  );
};
