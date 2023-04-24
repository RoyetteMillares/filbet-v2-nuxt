filename=types/image.key.d.ts
# filename=tmp.ts

list=($(find assets | grep -E '\/(.| )+\.(svg|png|jpg|jpeg|webp)'))

output=""

function append() {
  path=$1
  echo $path
  output="$output$path"
}

for path in ${list[@]}; do
  path="$(echo $path | sed -E "s/.(svg|png|jpg|jpeg|webp)//g")"
  path="$(echo $path | sed "s|assets/||g")"
  key="  | \"${path//\//-}\"
"
  append "$key"
done

cat <<EOF >$filename
declare type AssetKey =
$output
EOF
